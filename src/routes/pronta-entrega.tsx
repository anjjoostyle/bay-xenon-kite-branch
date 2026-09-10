import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CatalogSections } from "@/components/catalog-sections";
import { ProductDialog } from "@/components/forms";
import { LoadingScreen } from "@/components/loading-screen";
import { ProductPhoto } from "@/components/product-photo";
import { ShareLinkBox } from "@/components/share-link";
import { useHydrated } from "@/components/use-hydrated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { brandLabel } from "@/lib/brands";
import { formatBRL } from "@/lib/money";
import { useLedger } from "@/lib/store";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/pronta-entrega")({
  component: StockPage,
});

function StockPage() {
  const hydrated = useHydrated();
  const products = useLedger((s) => s.products);
  const upsertProduct = useLedger((s) => s.upsertProduct);
  const shop = useLedger((s) => s.settings.businessName);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const rows = useMemo(
    () =>
      [...products].sort((a, b) => {
        if (b.stock !== a.stock) return b.stock - a.stock;
        return a.name.localeCompare(b.name, "pt-BR");
      }),
    [products],
  );

  if (!hydrated) return <LoadingScreen />;

  return (
    <AppShell title="Pronta entrega">
      <h1 className="font-display text-3xl font-medium tracking-tight">
        Pronta entrega
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Separado por casa. A quantidade fica só com você; a cliente vê foto,
        nome, marca e preço.
      </p>
      <div className="mt-5">
        <ShareLinkBox
          path="/loja"
          title="Link da vitrine"
          description="Link curto: /loja. No teste, toque no campo se o copiar for bloqueado. Depois de publicar, mande pelo WhatsApp."
          message={`Olha a pronta entrega da ${shop || "loja"}:`}
        />
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" asChild>
          <Link to="/loja">
            <ExternalLink />
            Abrir vitrine
          </Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus />
          Cadastrar produto
        </Button>
      </div>
      {rows.length === 0 ? (
        <Card className="mt-5 px-5 py-10 text-center text-sm text-muted-foreground">
          Cadastre um produto com foto e estoque para aparecer na vitrine.
        </Card>
      ) : (
        <CatalogSections
          items={rows}
          renderItem={(product) => (
            <li key={product.id}>
              <Card className="p-3">
                <div className="flex items-start gap-3">
                  <ProductPhoto
                    photos={product.photos ?? []}
                    name={product.name}
                    className="size-24"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium">{product.name}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {brandLabel(product.brand)} · {formatBRL(product.unitPrice)}
                        </p>
                      </div>
                      {product.stock > 0 ? (
                        <Badge variant="success">Disponível</Badge>
                      ) : (
                        <Badge>Sem estoque</Badge>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap items-end gap-3">
                      <label className="flex min-w-28 flex-col gap-1.5">
                        <span className="text-xs font-medium text-muted-foreground">
                          Estoque (privado)
                        </span>
                        <Input
                          type="number"
                          min={0}
                          className="h-11 w-28"
                          defaultValue={product.stock}
                          key={`${product.id}-${product.stock}`}
                          onBlur={(e) => {
                            const next = Math.max(0, Number(e.target.value) || 0);
                            if (next === product.stock) return;
                            upsertProduct({
                              id: product.id,
                              name: product.name,
                              brand: product.brand,
                              unitPrice: product.unitPrice,
                              stock: next,
                              photos: product.photos ?? [],
                            });
                          }}
                        />
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditing(product);
                          setOpen(true);
                        }}
                      >
                        <Pencil />
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          )}
        />
      )}
      <ProductDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setEditing(null);
        }}
        product={editing}
      />
    </AppShell>
  );
}
