import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { brandLabel } from "@/lib/brands";
import { summarizeClient, summarizePurchase } from "@/lib/ledger";
import { formatBRL, formatDateLong } from "@/lib/money";
import type { Client, Payment, Purchase, Settings } from "@/lib/types";

function ShopHeader({ settings }: { settings: Settings }) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-foreground/15 pb-4">
      <div>
        <p className="font-display text-2xl font-semibold tracking-tight">
          {settings.businessName || "Minha Loja"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {[settings.document, settings.phone, settings.city]
            .filter(Boolean)
            .join(" · ") || "Comprovante gerado pela Caderneta"}
        </p>
      </div>
      <BrandMark className="size-10 shrink-0 print:hidden" />
    </header>
  );
}

function ReceiptFrame({
  title,
  number,
  children,
}: {
  title: string;
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background px-4 py-6 print:bg-white print:px-0 print:py-0">
      <div className="no-print mx-auto mb-4 flex w-full max-w-xl items-center justify-between gap-2">
        <Button variant="ghost" asChild>
          <Link to="/">
            <ArrowLeft />
            Voltar
          </Link>
        </Button>
        <Button onClick={() => window.print()}>
          <Printer />
          Imprimir / salvar PDF
        </Button>
      </div>
      <article className="print-sheet mx-auto w-full max-w-xl rounded-xl border border-border bg-card px-6 py-8 text-card-foreground print:max-w-none print:rounded-none print:border-0 print:px-10 print:py-8">
        <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase">
          {title}
        </p>
        <p className="mt-1 font-mono text-sm text-muted-foreground">{number}</p>
        {children}
        <footer className="mt-10 grid grid-cols-2 gap-8 pt-8">
          <div className="border-t border-foreground/30 pt-2 text-center text-xs text-muted-foreground">
            Assinatura da loja
          </div>
          <div className="border-t border-foreground/30 pt-2 text-center text-xs text-muted-foreground">
            Assinatura do cliente
          </div>
        </footer>
      </article>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  );
}

export function PurchaseReceipt({
  purchase,
  client,
  payments,
  settings,
}: {
  purchase: Purchase;
  client: Client;
  payments: Payment[];
  settings: Settings;
}) {
  const summary = summarizePurchase(purchase, payments);
  const clientSum = summarizeClient(client.id, [purchase], payments);

  return (
    <ReceiptFrame title="Comprovante de compra" number={purchase.receiptNumber}>
      <ShopHeader settings={settings} />
      <h1 className="mt-6 font-display text-3xl font-medium tracking-tight">
        {purchase.product}
      </h1>
      <p className="mt-1 text-muted-foreground">
        Emitido em {formatDateLong(purchase.date)}
      </p>
      <div className="mt-6 divide-y divide-border border-y border-border">
        <Row label="Cliente" value={client.name} />
        {client.phone ? <Row label="Telefone" value={client.phone} /> : null}
        <Row label="Produto" value={purchase.product} />
        <Row label="Marca" value={brandLabel(purchase.brand)} />
        <Row label="Quantidade" value={String(purchase.quantity)} />
        <Row label="Valor unitário" value={formatBRL(purchase.unitPrice)} />
        {purchase.cycle ? <Row label="Ciclo" value={purchase.cycle} /> : null}
        {purchase.orderNumber ? (
          <Row label="Nº do pedido" value={purchase.orderNumber} />
        ) : null}
        {purchase.dateCx ? (
          <Row label="Data CX" value={formatDateLong(purchase.dateCx)} />
        ) : null}
        <Row label="Valor da compra" value={formatBRL(purchase.amount)} />
        <Row
          label="Parcelas"
          value={
            purchase.installments === 1
              ? "À vista"
              : `${purchase.installments}x de ${formatBRL(summary.installmentValue)}`
          }
        />
        <Row
          label="Parcelas restantes"
          value={
            summary.settled
              ? "Quitado"
              : String(summary.remainingInstallments)
          }
        />
        <Row label="Saldo desta compra" value={formatBRL(summary.remaining)} />
      </div>
      <p className="mt-6 font-display text-2xl tabular-nums">
        Total {formatBRL(purchase.amount)}
      </p>
      {clientSum.paid > 0 ? (
        <p className="mt-1 text-sm text-muted-foreground">
          Já pago nesta compra: {formatBRL(summary.paid)}
        </p>
      ) : null}
    </ReceiptFrame>
  );
}

export function PaymentReceipt({
  payment,
  purchase,
  client,
  payments,
  allPurchases,
  settings,
}: {
  payment: Payment;
  purchase: Purchase;
  client: Client;
  payments: Payment[];
  allPurchases: Purchase[];
  settings: Settings;
}) {
  const summary = summarizePurchase(purchase, payments);
  const clientSum = summarizeClient(client.id, allPurchases, payments);

  return (
    <ReceiptFrame title="Comprovante de pagamento" number={payment.receiptNumber}>
      <ShopHeader settings={settings} />
      <h1 className="mt-6 font-display text-3xl font-medium tracking-tight">
        {formatBRL(payment.amount)}
      </h1>
      <p className="mt-1 text-muted-foreground">
        Recebido em {formatDateLong(payment.date)}
      </p>
      <div className="mt-6 divide-y divide-border border-y border-border">
        <Row label="Cliente" value={client.name} />
        {client.phone ? <Row label="Telefone" value={client.phone} /> : null}
        <Row label="Referente a" value={purchase.product} />
        <Row label="Compra nº" value={purchase.receiptNumber} />
        <Row label="Valor da compra" value={formatBRL(purchase.amount)} />
        <Row label="Valor pago agora" value={formatBRL(payment.amount)} />
        <Row label="Total pago nesta compra" value={formatBRL(summary.paid)} />
        <Row
          label="Parcelas restantes"
          value={
            summary.settled
              ? "Nenhuma — compra quitada"
              : `${summary.remainingInstallments} de ${purchase.installments}`
          }
        />
        <Row label="Saldo desta compra" value={formatBRL(summary.remaining)} />
        <Row label="Saldo total do cliente" value={formatBRL(clientSum.balance)} />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        {summary.settled
          ? "Esta compra está quitada."
          : `Ainda faltam ${summary.remainingInstallments} ${
              summary.remainingInstallments === 1 ? "parcela" : "parcelas"
            } desta compra.`}
      </p>
    </ReceiptFrame>
  );
}
