import { createFileRoute, Link } from "@tanstack/react-router";
import { PurchaseReceipt } from "@/components/receipt-view";
import { useHydrated } from "@/components/use-hydrated";
import { Button } from "@/components/ui/button";
import { useLedger } from "@/lib/store";

export const Route = createFileRoute("/recibo/compra/$purchaseId")({
  component: PurchaseReceiptPage,
});

function PurchaseReceiptPage() {
  const { purchaseId } = Route.useParams();
  const hydrated = useHydrated();
  const purchases = useLedger((s) => s.purchases);
  const clients = useLedger((s) => s.clients);
  const allPayments = useLedger((s) => s.payments);
  const settings = useLedger((s) => s.settings);
  const purchase = purchases.find((p) => p.id === purchaseId);
  const client = purchase
    ? clients.find((c) => c.id === purchase.clientId)
    : undefined;
  const payments = purchase
    ? allPayments.filter((p) => p.purchaseId === purchase.id)
    : [];

  if (!hydrated) {
    return <div className="min-h-dvh bg-background" />;
  }

  if (!purchase || !client) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="font-display text-2xl">Comprovante não encontrado</p>
        <Button asChild variant="outline">
          <Link to="/">Voltar</Link>
        </Button>
      </div>
    );
  }

  return (
    <PurchaseReceipt
      purchase={purchase}
      client={client}
      payments={payments}
      settings={settings}
    />
  );
}
