import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/app-shell";
import { CatalogSections } from "@/components/catalog-sections";
import { ProductPhoto } from "@/components/product-photo";
import { Card } from "@/components/ui/card";
import { getPublicPage } from "@/lib/api";
import { brandLabel } from "@/lib/brands";
import { formatBRL } from "@/lib/money";
import type { VitrinePayload } from "@/lib/types";

export const Route = createFileRoute("/loja")({ component: ShopWindow });

function ShopWindow() {
  const [data, setData] = useState<VitrinePayload | null | undefined>(undefined);

  useEffect(() => {
    void getPublicPage({ data: { key: "vitrine" } }).then((payload) => {
      setData((payload as VitrinePayload | null) ?? null);
    });
  }, []);

  if (data === undefined) {
    return (
      <PublicShell kicker="Pronta entrega">
        <p className="mt-6 text-muted-foreground">Carregando vitrine…</p>
      </PublicShell>
    );
  }

  const shop = data?.shop;
  const items = (data?.items ?? []).map((item) => ({
    ...item,
    photos: item.photos ?? [],
  }));

  return (
    <PublicShell kicker="Pronta entrega">
      <h1 className="mt-2 font-display text-3xl font-medium tracking-tight">
        {shop?.businessName || "Pronta entrega"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {[shop?.phone, shop?.city].filter(Boolean).join(" · ") ||
          "Separe por casa: Natura & Avon e O Boticário & Eudora."}
      </p>
      {items.length === 0 ? (
        <Card className="mt-6 px-5 py-10 text-center text-sm text-muted-foreground">
          No momento não há produtos em pronta entrega.
        </Card>
      ) : (
        <CatalogSections
          items={items}
          renderItem={(item) => (
            <li key={item.id}>
              <Card className="flex items-center gap-3 p-3">
                <ProductPhoto
                  photos={item.photos}
                  name={item.name}
                  className="size-24"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {brandLabel(item.brand)}
                  </p>
                  <p className="mt-2 font-medium tabular-nums">
                    {formatBRL(item.unitPrice)}
                  </p>
                </div>
              </Card>
            </li>
          )}
        />
      )}
    </PublicShell>
  );
}
