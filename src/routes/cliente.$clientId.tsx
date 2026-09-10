import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  Pencil,
  Plus,
  Receipt,
  Trash2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  ClientDialog,
  ConfirmDialog,
  PaymentDialog,
  PurchaseDialog,
} from "@/components/forms";
import { LoadingScreen } from "@/components/loading-screen";
import { ShareLinkBox } from "@/components/share-link";
import { useHydrated } from "@/components/use-hydrated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { summarizeClient, summarizePurchase } from "@/lib/ledger";
import { formatBRL, formatDate } from "@/lib/money";
import { brandLabel } from "@/lib/brands";
import { useLedger } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/cliente/$clientId")({
  component: ClientPage,
});

function ClientPage() {
  const { clientId } = Route.useParams();
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const clients = useLedger((s) => s.clients);
  const allPurchases = useLedger((s) => s.purchases);
  const allPayments = useLedger((s) => s.payments);
  const deleteClient = useLedger((s) => s.deleteClient);
  const deletePurchase = useLedger((s) => s.deletePurchase);
  const deletePayment = useLedger((s) => s.deletePayment);
  const shopName = useLedger((s) => s.settings.businessName);
  const client = clients.find((c) => c.id === clientId);
  const purchases = useMemo(
    () => allPurchases.filter((p) => p.clientId === clientId),
    [allPurchases, clientId],
  );
  const payments = useMemo(
    () => allPayments.filter((p) => p.clientId === clientId),
    [allPayments, clientId],
  );

  const [editOpen, setEditOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [confirmClient, setConfirmClient] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<
    { type: "purchase" | "payment"; id: string } | null
  >(null);

  const summary = useMemo(
    () => summarizeClient(clientId, allPurchases, allPayments),
    [clientId, allPurchases, allPayments],
  );

  const orderedPurchases = useMemo(
    () =>
      [...purchases].sort((a, b) =>
        a.date === b.date
          ? b.createdAt.localeCompare(a.createdAt)
          : b.date.localeCompare(a.date),
      ),
    [purchases],
  );

  const orderedPayments = useMemo(
    () =>
      [...payments].sort((a, b) =>
        a.date === b.date
          ? b.createdAt.localeCompare(a.createdAt)
          : b.date.localeCompare(a.date),
      ),
    [payments],
  );

  if (!hydrated) {
    return <LoadingScreen />;
  }

  if (!client) {
    return (
      <AppShell>
        <p className="font-display text-2xl">Cliente não encontrado</p>
        <Button asChild className="mt-4" variant="outline">
          <Link to="/">Voltar à lista</Link>
        </Button>
      </AppShell>
    );
  }

  return (
    <AppShell title="Ficha do cliente">
      <Link
        to="/"
        className="mb-4 inline-flex h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Clientes
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-medium tracking-tight">
            {client.name}
          </h1>
          {client.phone ? (
            <p className="mt-1 text-sm text-muted-foreground">{client.phone}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setEditOpen(true)} aria-label="Editar cliente">
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setConfirmClient(true)}
            aria-label="Excluir cliente"
          >
            <Trash2 />
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <ShareLinkBox
          path={`/c/${client.publicToken}`}
          title="Link da conta deste cliente"
          description="Link curto, só desta cliente. No teste, toque no campo se o copiar não funcionar."
          message={`${client.name}, aqui você acompanha suas compras na ${shopName || "loja"}:`}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Total comprado" value={formatBRL(summary.purchased)} />
        <Metric label="Total pago" value={formatBRL(summary.paid)} />
        <Metric label="Saldo" value={formatBRL(summary.balance)} emphasize />
        <Metric
          label="Parcelas restantes"
          value={String(summary.remainingInstallments)}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button onClick={() => setBuyOpen(true)}>
          <Plus />
          Nova compra
        </Button>
        <Button variant="outline" onClick={() => setPayOpen(true)}>
          <Banknote />
          Registrar pagamento
        </Button>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl font-medium">Compras</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cada nova compra soma no total acima.
        </p>
        {orderedPurchases.length === 0 ? (
          <Card className="mt-3 px-5 py-8 text-center text-sm text-muted-foreground">
            Nenhuma compra lançada ainda.
          </Card>
        ) : (
          <ul className="mt-3 flex flex-col gap-3">
            {orderedPurchases.map((purchase) => {
              const s = summarizePurchase(purchase, payments);
              return (
                <li key={purchase.id}>
                  <Card className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium">{purchase.product}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {formatDate(purchase.date)} · {purchase.receiptNumber}{" "}
                          · {brandLabel(purchase.brand)} · {purchase.quantity} un.
                          {purchase.cycle ? ` · ${purchase.cycle}` : ""}
                          {purchase.orderNumber
                            ? ` · Ped. ${purchase.orderNumber}`
                            : ""}
                          {purchase.installments === 1
                            ? " · à vista"
                            : ` · ${purchase.installments}x`}
                        </p>
                      </div>
                      <p className="shrink-0 font-medium tabular-nums">
                        {formatBRL(purchase.amount)}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {s.settled ? (
                        <Badge variant="success">Quitado</Badge>
                      ) : (
                        <Badge variant="warn">
                          Faltam {s.remainingInstallments}{" "}
                          {s.remainingInstallments === 1
                            ? "parcela"
                            : "parcelas"}
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        Pago {formatBRL(s.paid)} · saldo {formatBRL(s.remaining)}
                      </span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/recibo/compra/$purchaseId"
                          params={{ purchaseId: purchase.id }}
                        >
                          <Receipt />
                          Comprovante de compra
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setPendingDelete({ type: "purchase", id: purchase.id })
                        }
                      >
                        <Trash2 />
                        Excluir
                      </Button>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-medium">Pagamentos</h2>
        {orderedPayments.length === 0 ? (
          <Card className="mt-3 px-5 py-8 text-center text-sm text-muted-foreground">
            Nenhum pagamento registrado.
          </Card>
        ) : (
          <ul className="mt-3 flex flex-col gap-3">
            {orderedPayments.map((payment) => {
              const purchase = purchases.find((p) => p.id === payment.purchaseId);
              return (
                <li key={payment.id}>
                  <Card className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium tabular-nums">
                          {formatBRL(payment.amount)}
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {formatDate(payment.date)} · {payment.receiptNumber}
                          {purchase ? ` · ${purchase.product}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/recibo/pagamento/$paymentId"
                          params={{ paymentId: payment.id }}
                        >
                          <Receipt />
                          Comprovante de pagamento
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setPendingDelete({ type: "payment", id: payment.id })
                        }
                      >
                        <Trash2 />
                        Excluir
                      </Button>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <ClientDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        client={client}
      />
      <PurchaseDialog
        open={buyOpen}
        onOpenChange={setBuyOpen}
        client={client}
        onSaved={(id) =>
          navigate({
            to: "/recibo/compra/$purchaseId",
            params: { purchaseId: id },
          })
        }
      />
      <PaymentDialog
        open={payOpen}
        onOpenChange={setPayOpen}
        client={client}
        purchases={allPurchases}
        payments={allPayments}
        onSaved={(id) =>
          navigate({
            to: "/recibo/pagamento/$paymentId",
            params: { paymentId: id },
          })
        }
      />
      <ConfirmDialog
        open={confirmClient}
        onOpenChange={setConfirmClient}
        title="Excluir cliente?"
        description="Isso apaga as compras, os pagamentos e os comprovantes desta ficha."
        onConfirm={() => {
          deleteClient(client.id);
          void navigate({ to: "/" });
        }}
      />
      <ConfirmDialog
        open={pendingDelete !== null}
        onOpenChange={(next) => {
          if (!next) setPendingDelete(null);
        }}
        title={
          pendingDelete?.type === "payment"
            ? "Excluir pagamento?"
            : "Excluir compra?"
        }
        description={
          pendingDelete?.type === "purchase"
            ? "Os pagamentos desta compra também serão apagados."
            : "O saldo e as parcelas restantes voltam a considerar este valor."
        }
        onConfirm={() => {
          if (!pendingDelete) return;
          if (pendingDelete.type === "purchase") {
            deletePurchase(pendingDelete.id);
          } else {
            deletePayment(pendingDelete.id);
          }
          setPendingDelete(null);
        }}
      />
    </AppShell>
  );
}

function Metric({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-3">
      <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p
        className={`mt-1 tabular-nums ${emphasize ? "font-display text-xl font-medium text-primary" : "font-medium"}`}
      >
        {value}
      </p>
    </div>
  );
}
