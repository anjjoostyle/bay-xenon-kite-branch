import { putPublicPage } from "@/lib/api";
import { brandLabel } from "@/lib/brands";
import { summarizeClient, summarizePurchase } from "@/lib/ledger";
import { useLedger } from "@/lib/store";
import type { StatementPayload, VitrinePayload } from "@/lib/types";

function shopInfo() {
  const { settings } = useLedger.getState();
  return {
    businessName: settings.businessName || "Minha Loja",
    phone: settings.phone,
    city: settings.city,
  };
}

export async function syncVitrine() {
  const { products } = useLedger.getState();
  const payload: VitrinePayload = {
    shop: shopInfo(),
    items: products
      .filter((p) => p.stock > 0)
      .map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        unitPrice: p.unitPrice,
        photos: (p.photos ?? []).slice(0, 2),
      })),
  };
  await putPublicPage({ data: { key: "vitrine", payload } });
}

export async function syncStatement(clientId: string) {
  const { clients, purchases, payments } = useLedger.getState();
  const client = clients.find((c) => c.id === clientId);
  if (!client) return;
  const summary = summarizeClient(client.id, purchases, payments);
  const payload: StatementPayload = {
    shop: shopInfo(),
    clientName: client.name,
    purchases: purchases
      .filter((p) => p.clientId === client.id)
      .map((purchase) => {
        const s = summarizePurchase(purchase, payments);
        return {
          product: purchase.product,
          brand: brandLabel(purchase.brand),
          date: purchase.date,
          amount: purchase.amount,
          remaining: s.remaining,
          remainingInstallments: s.remainingInstallments,
          settled: s.settled,
        };
      }),
    purchased: summary.purchased,
    paid: summary.paid,
    balance: summary.balance,
    remainingInstallments: summary.remainingInstallments,
  };
  await putPublicPage({
    data: { key: `conta:${client.publicToken}`, payload },
  });
}

export async function syncPublicPages() {
  const { clients } = useLedger.getState();
  await syncVitrine();
  await Promise.all(clients.map((c) => syncStatement(c.id)));
}
