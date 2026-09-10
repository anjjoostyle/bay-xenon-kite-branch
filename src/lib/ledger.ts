import type {
  ClientSummary,
  Payment,
  Purchase,
  PurchaseSummary,
} from "./types";

export function summarizePurchase(
  purchase: Purchase,
  payments: Payment[],
): PurchaseSummary {
  const paid = payments
    .filter((p) => p.purchaseId === purchase.id)
    .reduce((sum, p) => sum + p.amount, 0);
  const remaining = Math.max(0, purchase.amount - paid);
  const installmentValue = Math.round(purchase.amount / purchase.installments);
  const settled = remaining <= 0;
  const remainingInstallments = settled
    ? 0
    : Math.min(
        purchase.installments,
        Math.max(1, Math.ceil(remaining / Math.max(installmentValue, 1))),
      );

  return { paid, remaining, remainingInstallments, installmentValue, settled };
}

export function summarizeClient(
  clientId: string,
  purchases: Purchase[],
  payments: Payment[],
): ClientSummary {
  const clientPurchases = purchases.filter((p) => p.clientId === clientId);
  const clientPayments = payments.filter((p) => p.clientId === clientId);
  const purchased = clientPurchases.reduce((sum, p) => sum + p.amount, 0);
  const paid = clientPayments.reduce((sum, p) => sum + p.amount, 0);
  const remainingInstallments = clientPurchases.reduce((sum, purchase) => {
    return sum + summarizePurchase(purchase, clientPayments).remainingInstallments;
  }, 0);

  return {
    purchased,
    paid,
    balance: Math.max(0, purchased - paid),
    remainingInstallments,
    purchaseCount: clientPurchases.length,
    paymentCount: clientPayments.length,
  };
}

export function summarizeShop(purchases: Purchase[], payments: Payment[]) {
  const purchased = purchases.reduce((sum, p) => sum + p.amount, 0);
  const paid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remainingInstallments = purchases.reduce((sum, purchase) => {
    return sum + summarizePurchase(purchase, payments).remainingInstallments;
  }, 0);

  return {
    purchased,
    paid,
    balance: Math.max(0, purchased - paid),
    remainingInstallments,
  };
}

export function openPurchases(
  clientId: string,
  purchases: Purchase[],
  payments: Payment[],
): Purchase[] {
  return purchases
    .filter((p) => p.clientId === clientId)
    .filter((p) => !summarizePurchase(p, payments).settled)
    .sort((a, b) => a.date.localeCompare(b.date));
}
