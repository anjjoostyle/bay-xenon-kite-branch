import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CatalogSections } from "@/components/catalog-sections";
import { ConfirmDialog, ProductDialog } from "@/components/forms";
import { LoadingScreen } from "@/components/loading-screen";
import { ProductPhoto } from "@/components/product-photo";
import { useHydrated } from "@/components/use-hydrated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { brandLabel } from "@/lib/brands";
import { formatBRL } from "@/lib/money";
import { useLedger } from "@/lib/store";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/produtos")({ component: ProductsPage });

function ProductsPage() {
  const hydrated = useHydrated();
  const products = useLedger((s) => s.products);
  const deleteProduct = useLedger((s) => s.deleteProduct);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [pending, setPending] = useState<Product | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...products]
      .filter((p) =>
        q
          ? p.name.toLowerCase().includes(q) ||
            brandLabel(p.brand).toLowerCase().includes(q)
          : true,
      )
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [products, query]);

  if (!hydrated) return <LoadingScreen />;

  return (
    <AppShell title="Produtos">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight">
            Produtos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Cadastre com 1 ou 2 fotos. Separados em Natura & Avon e O Boticário
            & Eudora.
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}>
          <Plus />
          Novo produto
        </Button>
      </div>
      <Input
        className="mt-5"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar produto ou marca"
        aria-label="Buscar produto"
      />
      {rows.length === 0 ? (
        <Card className="mt-4 px-5 py-10 text-center text-sm text-muted-foreground">
          Nenhum produto cadastrado.
        </Card>
      ) : (
        <CatalogSections
          items={rows}
          renderItem={(product) => (
            <li key={product.id}>
              <Card className="flex items-center gap-3 p-3">
                <ProductPhoto
                  photos={product.photos ?? []}
                  name={product.name}
                  className="size-20"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {brandLabel(product.brand)} · {formatBRL(product.unitPrice)}
                  </p>
                </div>
                {product.stock > 0 ? (
                  <Badge variant="success">Em estoque</Badge>
                ) : (
                  <Badge>Catálogo</Badge>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Editar produto"
                  onClick={() => {
                    setEditing(product);
                    setOpen(true);
                  }}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Excluir produto"
                  onClick={() => setPending(product)}
                >
                  <Trash2 />
                </Button>
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
      <ConfirmDialog
        open={pending !== null}
        onOpenChange={(next) => {
          if (!next) setPending(null);
        }}
        title="Excluir produto?"
        description="Ele sai do cadastro e da pronta entrega. Compras já lançadas continuam na ficha do cliente."
        onConfirm={() => {
          if (pending) deleteProduct(pending.id);
          setPending(null);
        }}
      />
    </AppShell>
  );
}
