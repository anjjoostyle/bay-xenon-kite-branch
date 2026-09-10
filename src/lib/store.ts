import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BrandId } from "./brands";
import { receiptCode } from "./money";
import { demoPhoto, shortCode } from "./photos";
import type { Client, Payment, Product, Purchase, Settings } from "./types";

type LedgerState = {
  hydrated: boolean;
  onboarded: boolean;
  clients: Client[];
  products: Product[];
  purchases: Purchase[];
  payments: Payment[];
  settings: Settings;
  purchaseSeq: number;
  paymentSeq: number;
  setHydrated: (value: boolean) => void;
  addClient: (input: { name: string; phone: string }) => string;
  updateClient: (id: string, patch: { name: string; phone: string }) => void;
  deleteClient: (id: string) => void;
  upsertProduct: (input: {
    id?: string;
    name: string;
    brand: BrandId;
    unitPrice: number;
    stock: number;
    photos: string[];
  }) => string;
  deleteProduct: (id: string) => void;
  addPurchase: (input: {
    clientId: string;
    product: string;
    brand: BrandId;
    quantity: number;
    unitPrice: number;
    amount: number;
    date: string;
    dateCx: string;
    cycle: string;
    orderNumber: string;
    installments: number;
    fromStock: boolean;
  }) => string;
  deletePurchase: (id: string) => void;
  addPayment: (input: {
    clientId: string;
    purchaseId: string;
    amount: number;
    date: string;
  }) => string;
  deletePayment: (id: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  clearAll: () => void;
  loadDemo: () => void;
};

const emptySettings: Settings = {
  businessName: "Minha Loja",
  phone: "",
  city: "",
  document: "",
};

function nid(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

function bumpPublic() {
  void import("./publish")
    .then((m) => m.syncPublicPages())
    .catch(() => undefined);
}

function demoData() {
  const products: Product[] = [
    {
      id: "prd-tododia",
      name: "Tododia Hidratante",
      brand: "natura",
      unitPrice: 4290,
      stock: 6,
      photos: [demoPhoto("Tododia", "natura"), demoPhoto("Tododia", "natura", 1)],
      createdAt: "2026-08-01T10:00:00.000Z",
    },
    {
      id: "prd-kaiak",
      name: "Kaiak Clássico",
      brand: "natura",
      unitPrice: 11990,
      stock: 2,
      photos: [demoPhoto("Kaiak", "natura"), demoPhoto("Kaiak", "natura", 1)],
      createdAt: "2026-08-01T10:00:00.000Z",
    },
    {
      id: "prd-renew",
      name: "Renew Clinical",
      brand: "avon",
      unitPrice: 8990,
      stock: 4,
      photos: [demoPhoto("Renew", "avon")],
      createdAt: "2026-08-01T10:00:00.000Z",
    },
    {
      id: "prd-malbec",
      name: "Malbec Tradicional",
      brand: "boticario",
      unitPrice: 15990,
      stock: 3,
      photos: [demoPhoto("Malbec", "boticario"), demoPhoto("Malbec", "boticario", 1)],
      createdAt: "2026-08-01T10:00:00.000Z",
    },
    {
      id: "prd-instance",
      name: "Instance Frutas Vermelhas",
      brand: "eudora",
      unitPrice: 5490,
      stock: 5,
      photos: [demoPhoto("Instance", "eudora")],
      createdAt: "2026-08-01T10:00:00.000Z",
    },
    {
      id: "prd-una",
      name: "Una Senses",
      brand: "natura",
      unitPrice: 18990,
      stock: 0,
      photos: [demoPhoto("Una", "natura")],
      createdAt: "2026-08-01T10:00:00.000Z",
    },
  ];

  const clients: Client[] = [
    {
      id: "cli-ana",
      name: "Ana Oliveira",
      phone: "(11) 98888-1010",
      publicToken: "ANA07",
      createdAt: "2026-08-10T10:00:00.000Z",
    },
    {
      id: "cli-carlos",
      name: "Carlos Mendes",
      phone: "(21) 97777-2020",
      publicToken: "CAR21",
      createdAt: "2026-08-15T10:00:00.000Z",
    },
    {
      id: "cli-juliana",
      name: "Juliana Costa",
      phone: "(31) 96666-3030",
      publicToken: "JUL31",
      createdAt: "2026-09-01T10:00:00.000Z",
    },
  ];

  const purchases: Purchase[] = [
    {
      id: "buy-ana-1",
      clientId: "cli-ana",
      product: "Tododia Hidratante",
      brand: "natura",
      quantity: 2,
      unitPrice: 4290,
      amount: 8580,
      date: "2026-08-10",
      dateCx: "2026-08-12",
      cycle: "Ciclo 10",
      orderNumber: "PED-1042",
      installments: 3,
      receiptNumber: "C-0001",
      createdAt: "2026-08-10T10:00:00.000Z",
    },
    {
      id: "buy-carlos-1",
      clientId: "cli-carlos",
      product: "Malbec Tradicional",
      brand: "boticario",
      quantity: 1,
      unitPrice: 15990,
      amount: 15990,
      date: "2026-08-15",
      dateCx: "2026-08-16",
      cycle: "Ciclo 11",
      orderNumber: "PED-1108",
      installments: 4,
      receiptNumber: "C-0002",
      createdAt: "2026-08-15T10:00:00.000Z",
    },
    {
      id: "buy-juliana-1",
      clientId: "cli-juliana",
      product: "Instance Frutas Vermelhas",
      brand: "eudora",
      quantity: 1,
      unitPrice: 5490,
      amount: 5490,
      date: "2026-09-01",
      dateCx: "2026-09-01",
      cycle: "Ciclo 12",
      orderNumber: "PED-1201",
      installments: 1,
      receiptNumber: "C-0003",
      createdAt: "2026-09-01T10:00:00.000Z",
    },
  ];

  const payments: Payment[] = [
    {
      id: "pay-ana-1",
      clientId: "cli-ana",
      purchaseId: "buy-ana-1",
      amount: 2860,
      date: "2026-08-20",
      receiptNumber: "P-0001",
      createdAt: "2026-08-20T10:00:00.000Z",
    },
    {
      id: "pay-ana-2",
      clientId: "cli-ana",
      purchaseId: "buy-ana-1",
      amount: 2860,
      date: "2026-09-01",
      receiptNumber: "P-0002",
      createdAt: "2026-09-01T10:00:00.000Z",
    },
    {
      id: "pay-carlos-1",
      clientId: "cli-carlos",
      purchaseId: "buy-carlos-1",
      amount: 4000,
      date: "2026-08-15",
      receiptNumber: "P-0003",
      createdAt: "2026-08-15T11:00:00.000Z",
    },
    {
      id: "pay-carlos-2",
      clientId: "cli-carlos",
      purchaseId: "buy-carlos-1",
      amount: 4000,
      date: "2026-09-01",
      receiptNumber: "P-0004",
      createdAt: "2026-09-01T11:00:00.000Z",
    },
    {
      id: "pay-juliana-1",
      clientId: "cli-juliana",
      purchaseId: "buy-juliana-1",
      amount: 5490,
      date: "2026-09-01",
      receiptNumber: "P-0005",
      createdAt: "2026-09-01T12:00:00.000Z",
    },
  ];

  return {
    clients,
    products,
    purchases,
    payments,
    settings: {
      businessName: "Espaço Beleza",
      phone: "(11) 3333-4040",
      city: "São Paulo, SP",
      document: "12.345.678/0001-90",
    },
    purchaseSeq: 3,
    paymentSeq: 5,
  };
}

function normalizeProductName(name: string) {
  return name.trim().toLocaleLowerCase("pt-BR");
}

export const useLedger = create<LedgerState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      onboarded: false,
      clients: [],
      products: [],
      purchases: [],
      payments: [],
      settings: emptySettings,
      purchaseSeq: 0,
      paymentSeq: 0,
      setHydrated: (value) => set({ hydrated: value }),
      addClient: ({ name, phone }) => {
        const existing = new Set(get().clients.map((c) => c.publicToken));
        let publicToken = shortCode();
        while (existing.has(publicToken)) publicToken = shortCode();
        const id = nid("cli");
        const client: Client = {
          id,
          name: name.trim(),
          phone: phone.trim(),
          publicToken,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ clients: [client, ...s.clients] }));
        bumpPublic();
        return id;
      },
      updateClient: (id, patch) => {
        set((s) => ({
          clients: s.clients.map((c) =>
            c.id === id
              ? { ...c, name: patch.name.trim(), phone: patch.phone.trim() }
              : c,
          ),
        }));
        bumpPublic();
      },
      deleteClient: (id) => {
        set((s) => ({
          clients: s.clients.filter((c) => c.id !== id),
          purchases: s.purchases.filter((p) => p.clientId !== id),
          payments: s.payments.filter((p) => p.clientId !== id),
        }));
        bumpPublic();
      },
      upsertProduct: ({ id, name, brand, unitPrice, stock, photos }) => {
        const trimmed = name.trim();
        const existing =
          id
            ? get().products.find((p) => p.id === id)
            : get().products.find(
                (p) =>
                  p.brand === brand &&
                  normalizeProductName(p.name) === normalizeProductName(trimmed),
              );
        const productId = existing?.id ?? nid("prd");
        const next: Product = {
          id: productId,
          name: trimmed,
          brand,
          unitPrice,
          stock: Math.max(0, Math.round(stock)),
          photos: (photos ?? existing?.photos ?? []).slice(0, 2),
          createdAt: existing?.createdAt ?? new Date().toISOString(),
        };
        set((s) => ({
          products: existing
            ? s.products.map((p) => (p.id === productId ? next : p))
            : [next, ...s.products],
        }));
        bumpPublic();
        return productId;
      },
      deleteProduct: (id) => {
        set((s) => ({ products: s.products.filter((p) => p.id !== id) }));
        bumpPublic();
      },
      addPurchase: (input) => {
        const seq = get().purchaseSeq + 1;
        const id = nid("buy");
        const productName = input.product.trim();
        const purchase: Purchase = {
          id,
          clientId: input.clientId,
          product: productName,
          brand: input.brand,
          quantity: Math.max(1, input.quantity),
          unitPrice: input.unitPrice,
          amount: input.amount,
          date: input.date,
          dateCx: input.dateCx || input.date,
          cycle: input.cycle.trim(),
          orderNumber: input.orderNumber.trim(),
          installments: input.installments,
          receiptNumber: receiptCode("C", seq),
          createdAt: new Date().toISOString(),
        };

        const match = get().products.find(
          (p) =>
            p.brand === input.brand &&
            normalizeProductName(p.name) === normalizeProductName(productName),
        );

        set((s) => {
          let products = s.products;
          if (!match) {
            products = [
              {
                id: nid("prd"),
                name: productName,
                brand: input.brand,
                unitPrice: input.unitPrice,
                stock: 0,
                photos: [],
                createdAt: new Date().toISOString(),
              },
              ...products,
            ];
          } else if (input.fromStock) {
            products = products.map((p) =>
              p.id === match.id
                ? { ...p, stock: Math.max(0, p.stock - purchase.quantity) }
                : p,
            );
          }
          return {
            purchases: [purchase, ...s.purchases],
            products,
            purchaseSeq: seq,
          };
        });
        bumpPublic();
        return id;
      },
      deletePurchase: (id) => {
        set((s) => ({
          purchases: s.purchases.filter((p) => p.id !== id),
          payments: s.payments.filter((p) => p.purchaseId !== id),
        }));
        bumpPublic();
      },
      addPayment: ({ clientId, purchaseId, amount, date }) => {
        const seq = get().paymentSeq + 1;
        const id = nid("pay");
        const payment: Payment = {
          id,
          clientId,
          purchaseId,
          amount,
          date,
          receiptNumber: receiptCode("P", seq),
          createdAt: new Date().toISOString(),
        };
        set((s) => ({
          payments: [payment, ...s.payments],
          paymentSeq: seq,
        }));
        bumpPublic();
        return id;
      },
      deletePayment: (id) => {
        set((s) => ({
          payments: s.payments.filter((p) => p.id !== id),
        }));
        bumpPublic();
      },
      updateSettings: (patch) => {
        set((s) => ({ settings: { ...s.settings, ...patch } }));
        bumpPublic();
      },
      clearAll: () => {
        set({
          clients: [],
          products: [],
          purchases: [],
          payments: [],
          settings: emptySettings,
          purchaseSeq: 0,
          paymentSeq: 0,
          onboarded: true,
        });
        bumpPublic();
      },
      loadDemo: () => {
        set({ ...demoData(), onboarded: true });
        bumpPublic();
      },
    }),
    {
      name: "caderneta-ledger-v1",
      skipHydration: true,
      partialize: (s) => ({
        onboarded: s.onboarded,
        clients: s.clients,
        products: s.products,
        purchases: s.purchases,
        payments: s.payments,
        settings: s.settings,
        purchaseSeq: s.purchaseSeq,
        paymentSeq: s.paymentSeq,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<LedgerState>;
        const clients = (p.clients ?? []).map((c) => ({
          ...c,
          publicToken: c.publicToken || shortCode(),
        }));
        const purchases = (p.purchases ?? []).map((buy) => ({
          ...buy,
          brand: buy.brand ?? ("natura" as BrandId),
          quantity: buy.quantity ?? 1,
          unitPrice: buy.unitPrice ?? buy.amount,
          dateCx: buy.dateCx || buy.date,
          cycle: buy.cycle ?? "",
          orderNumber: buy.orderNumber ?? "",
        }));
        return {
          ...current,
          ...p,
          clients,
          products: (p.products ?? []).map((product) => ({
            ...product,
            photos:
              Array.isArray(product.photos) && product.photos.length > 0
                ? product.photos.slice(0, 2)
                : [
                    demoPhoto(
                      product.name || "Produto",
                      product.brand ?? "natura",
                    ),
                  ],
          })),
          purchases,
        };
      },
    },
  ),
);
