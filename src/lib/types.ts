import type { BrandId } from "./brands";

export type Client = {
  id: string;
  name: string;
  phone: string;
  publicToken: string;
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  brand: BrandId;
  unitPrice: number;
  stock: number;
  photos: string[];
  createdAt: string;
};

export type Purchase = {
  id: string;
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
  receiptNumber: string;
  createdAt: string;
};

export type Payment = {
  id: string;
  clientId: string;
  purchaseId: string;
  amount: number;
  date: string;
  receiptNumber: string;
  createdAt: string;
};

export type Settings = {
  businessName: string;
  phone: string;
  city: string;
  document: string;
};

export type PurchaseSummary = {
  paid: number;
  remaining: number;
  remainingInstallments: number;
  installmentValue: number;
  settled: boolean;
};

export type ClientSummary = {
  purchased: number;
  paid: number;
  balance: number;
  remainingInstallments: number;
  purchaseCount: number;
  paymentCount: number;
};

export type VitrinePayload = {
  shop: {
    businessName: string;
    phone: string;
    city: string;
  };
  items: Array<{
    id: string;
    name: string;
    brand: BrandId;
    unitPrice: number;
    photos: string[];
  }>;
};

export type StatementPayload = {
  shop: {
    businessName: string;
    phone: string;
    city: string;
  };
  clientName: string;
  purchases: Array<{
    product: string;
    brand: string;
    date: string;
    amount: number;
    remaining: number;
    remainingInstallments: number;
    settled: boolean;
  }>;
  purchased: number;
  paid: number;
  balance: number;
  remainingInstallments: number;
};
