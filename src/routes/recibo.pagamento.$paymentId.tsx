import { createFileRoute, Link } from "@tanstack/react-router";
import { PaymentReceipt } from "@/components/receipt-view";
import { useHydrated } from "@/components/use-hydrated";
import { Button } from "@/components/ui/button";
import { useLedger } from "@/lib/store";

export const Route = createFileRoute("/recibo/pagamento/$paymentId")({
  component: PaymentReceiptPage,
});

function PaymentReceiptPage() {
  const { paymentId } = Route.useParams();
  const hydrated = useHydrated();
  const allPayments = useLedger((s) => s.payments);
  const allPurchases = useLedger((s) => s.purchases);
  const clients = useLedger((s) => s.clients);
  const settings = useLedger((s) => s.settings);
  const payment = allPayments.find((p) => p.id === paymentId);
  const purchase = payment
    ? allPurchases.find((p) => p.id === payment.purchaseId)
    : undefined;
  const client = payment
    ? clients.find((c) => c.id === payment.clientId)
    : undefined;
  const payments = client
    ? allPayments.filter((p) => p.clientId === client.id)
    : [];
  const purchases = client
    ? allPurchases.filter((p) => p.clientId === client.id)
    : [];

  if (!hydrated) {
    return <div className="min-h-dvh bg-background" />;
  }

  if (!payment || !purchase || !client) {
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
    <PaymentReceipt
      payment={payment}
      purchase={purchase}
      client={client}
      payments={payments}
      allPurchases={purchases}
      settings={settings}
    />
  );
}
