import type { ReactNode } from "react";
import { groupByHouse } from "@/lib/brands";
import type { BrandId } from "@/lib/brands";

export function CatalogSections<T extends { brand: BrandId }>({
  items,
  renderItem,
}: {
  items: T[];
  renderItem: (item: T) => ReactNode;
}) {
  const groups = groupByHouse(items);

  if (groups.length === 0) return null;

  return (
    <div className="mt-5 flex flex-col gap-8">
      {groups.map(({ house, items: rows }) => (
        <section key={house.id}>
          <h2 className="font-display text-xl font-medium tracking-tight">
            {house.label}
          </h2>
          <ul className="mt-3 flex flex-col gap-3">
            {rows.map((item) => renderItem(item))}
          </ul>
        </section>
      ))}
    </div>
  );
}
