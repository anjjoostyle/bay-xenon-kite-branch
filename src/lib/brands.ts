export const BRAND_IDS = ["natura", "avon", "boticario", "eudora"] as const;

export type BrandId = (typeof BRAND_IDS)[number];

export const BRAND_HOUSES = [
  {
    id: "natura-avon",
    label: "Natura & Avon",
    brands: [
      { id: "natura", label: "Natura" },
      { id: "avon", label: "Avon" },
    ],
  },
  {
    id: "boticario-eudora",
    label: "O Boticário & Eudora",
    brands: [
      { id: "boticario", label: "O Boticário" },
      { id: "eudora", label: "Eudora" },
    ],
  },
] as const;

const LABELS: Record<BrandId, string> = {
  natura: "Natura",
  avon: "Avon",
  boticario: "O Boticário",
  eudora: "Eudora",
};

export function isBrandId(value: string): value is BrandId {
  return (BRAND_IDS as readonly string[]).includes(value);
}

export function brandLabel(id: string): string {
  return isBrandId(id) ? LABELS[id] : id;
}

export function groupByHouse<T extends { brand: BrandId }>(items: T[]) {
  return BRAND_HOUSES.map((house) => ({
    house,
    items: items.filter((item) =>
      house.brands.some((brand) => brand.id === item.brand),
    ),
  })).filter((group) => group.items.length > 0);
}
