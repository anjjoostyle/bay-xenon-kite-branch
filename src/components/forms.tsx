import { useEffect, useMemo, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { BrandSelect } from "@/components/brand-select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, Input, NativeSelect } from "@/components/ui/input";
import type { BrandId } from "@/lib/brands";
import { openPurchases, summarizePurchase } from "@/lib/ledger";
import { formatBRL, parseBRL, todayISO } from "@/lib/money";
import { compressPhoto } from "@/lib/photos";
import { useLedger } from "@/lib/store";
import type { Client, Payment, Product, Purchase } from "@/lib/types";

export function ClientDialog({
  open,
  onOpenChange,
  client,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client | null;
  onSaved?: (id: string) => void;
}) {
  const addClient = useLedger((s) => s.addClient);
  const updateClient = useLedger((s) => s.updateClient);
  const [name, setName] = useState(client?.name ?? "");
  const [phone, setPhone] = useState(client?.phone ?? "");

  useEffect(() => {
    if (!open) return;
    setName(client?.name ?? "");
    setPhone(client?.phone ?? "");
  }, [open, client]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const trimmed = name.trim();
            if (!trimmed) {
              toast.error("Informe o nome do cliente.");
              return;
            }
            if (client) {
              updateClient(client.id, { name: trimmed, phone });
              toast.success("Cliente atualizado.");
              onSaved?.(client.id);
            } else {
              const id = addClient({ name: trimmed, phone });
              toast.success("Cliente cadastrado.");
              onSaved?.(id);
            }
            onOpenChange(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {client ? "Editar cliente" : "Novo cliente"}
            </DialogTitle>
            <DialogDescription>
              O total das compras aparece na ficha dele, e cresce a cada venda.
            </DialogDescription>
          </DialogHeader>
          <Field label="Nome">
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              required
            />
          </Field>
          <Field label="Telefone" hint="Opcional">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 00000-0000"
              inputMode="tel"
            />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{client ? "Salvar" : "Cadastrar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function PurchaseDialog({
  open,
  onOpenChange,
  client,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
  onSaved?: (id: string) => void;
}) {
  const addPurchase = useLedger((s) => s.addPurchase);
  const products = useLedger((s) => s.products);
  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState<BrandId>("natura");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState(todayISO());
  const [dateCx, setDateCx] = useState(todayISO());
  const [cycle, setCycle] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [installments, setInstallments] = useState("1");
  const [fromStock, setFromStock] = useState(false);

  useEffect(() => {
    if (!open) return;
    setProduct("");
    setBrand("natura");
    setQuantity("1");
    setUnit("");
    setTotal("");
    setDate(todayISO());
    setDateCx(todayISO());
    setCycle("");
    setOrderNumber("");
    setInstallments("1");
    setFromStock(false);
  }, [open]);

  const unitCents = parseBRL(unit);
  const qty = Math.max(1, Number(quantity) || 1);
  const totalCents = parseBRL(total);
  const inst = Number(installments) || 1;
  const match = products.find(
    (p) =>
      p.brand === brand &&
      p.name.trim().toLocaleLowerCase("pt-BR") ===
        product.trim().toLocaleLowerCase("pt-BR"),
  );

  function applyProduct(name: string, nextBrand = brand) {
    setProduct(name);
    const found = products.find(
      (p) =>
        p.brand === nextBrand &&
        p.name.trim().toLocaleLowerCase("pt-BR") ===
          name.trim().toLocaleLowerCase("pt-BR"),
    );
    if (found) {
      const unitText = (found.unitPrice / 100).toFixed(2).replace(".", ",");
      setUnit(unitText);
      const q = Math.max(1, Number(quantity) || 1);
      setTotal(((found.unitPrice * q) / 100).toFixed(2).replace(".", ","));
      setFromStock(found.stock > 0);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-lg overflow-y-auto">
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!product.trim()) {
              toast.error("Informe o produto.");
              return;
            }
            if (unitCents === null || unitCents <= 0) {
              toast.error("Informe o valor unitário.");
              return;
            }
            const amount =
              totalCents !== null && totalCents > 0
                ? totalCents
                : unitCents * qty;
            if (amount <= 0) {
              toast.error("Informe um valor total válido.");
              return;
            }
            if (fromStock && match && match.stock < qty) {
              toast.error(
                `Estoque insuficiente (${match.stock} un.). Ajuste a quantidade ou desmarque pronta entrega.`,
              );
              return;
            }
            const id = addPurchase({
              clientId: client.id,
              product,
              brand,
              quantity: qty,
              unitPrice: unitCents,
              amount,
              date,
              dateCx,
              cycle,
              orderNumber,
              installments: Math.min(24, Math.max(1, inst)),
              fromStock,
            });
            toast.success(
              match
                ? "Compra lançada. O total do cliente foi atualizado."
                : "Compra lançada e produto cadastrado automaticamente.",
            );
            onSaved?.(id);
            onOpenChange(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Nova compra</DialogTitle>
            <DialogDescription>
              Venda para {client.name}. Se o produto não existir, ele entra no
              cadastro.
            </DialogDescription>
          </DialogHeader>
          <Field label="Marca">
            <BrandSelect value={brand} onChange={setBrand} />
          </Field>
          <Field label="Produto">
            <Input
              autoFocus
              list="caderneta-products"
              value={product}
              onChange={(e) => applyProduct(e.target.value)}
              placeholder="Nome do produto"
              required
            />
            <datalist id="caderneta-products">
              {products
                .filter((p) => p.brand === brand)
                .map((p) => (
                  <option key={p.id} value={p.name} />
                ))}
            </datalist>
          </Field>
          {!match && product.trim() ? (
            <p className="text-xs text-muted-foreground">
              Esse produto ainda não está cadastrado — vai ser criado ao lançar.
            </p>
          ) : null}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Quantidade">
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  const nextQty = Math.max(1, Number(e.target.value) || 1);
                  if (unitCents && unitCents > 0) {
                    setTotal(
                      ((unitCents * nextQty) / 100).toFixed(2).replace(".", ","),
                    );
                  }
                }}
                required
              />
            </Field>
            <Field label="Valor unitário">
              <Input
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  const parsed = parseBRL(e.target.value);
                  if (parsed && parsed > 0) {
                    setTotal(
                      ((parsed * qty) / 100).toFixed(2).replace(".", ","),
                    );
                  }
                }}
                placeholder="0,00"
                inputMode="decimal"
                required
              />
            </Field>
          </div>
          <Field label="Valor total">
            <Input
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="0,00"
              inputMode="decimal"
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ciclo da revista">
              <Input
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
                placeholder="Ex.: Ciclo 12"
              />
            </Field>
            <Field label="Nº meu pedido">
              <Input
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Ex.: PED-1201"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Data da compra">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Field>
            <Field label="Data CX">
              <Input
                type="date"
                value={dateCx}
                onChange={(e) => setDateCx(e.target.value)}
              />
            </Field>
          </div>
          <Field label="Parcelas">
            <NativeSelect
              value={installments}
              onChange={(e) => setInstallments(e.target.value)}
            >
              {Array.from({ length: 24 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n === 1 ? "À vista (1x)" : `${n}x`}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <label className="flex min-h-11 items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-primary"
              checked={fromStock}
              onChange={(e) => setFromStock(e.target.checked)}
              disabled={!match || match.stock <= 0}
            />
            <span>
              Baixar da pronta entrega
              {match ? (
                <span className="block text-xs text-muted-foreground">
                  Estoque atual: {match.stock} un. (só você vê essa quantidade)
                </span>
              ) : (
                <span className="block text-xs text-muted-foreground">
                  Disponível depois que o produto for cadastrado.
                </span>
              )}
            </span>
          </label>
          {unitCents && unitCents > 0 ? (
            <p className="text-sm text-muted-foreground">
              {qty} un. · {inst}x de{" "}
              {formatBRL(
                Math.round(
                  (totalCents && totalCents > 0 ? totalCents : unitCents * qty) /
                    inst,
                ),
              )}
            </p>
          ) : null}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Lançar compra</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}) {
  const upsertProduct = useLedger((s) => s.upsertProduct);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState<BrandId>("natura");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("0");
  const [photos, setPhotos] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName(product?.name ?? "");
    setBrand(product?.brand ?? "natura");
    setUnit(
      product
        ? (product.unitPrice / 100).toFixed(2).replace(".", ",")
        : "",
    );
    setStock(String(product?.stock ?? 0));
    setPhotos(product?.photos?.slice(0, 2) ?? []);
  }, [open, product]);

  async function addPhoto(file: File | undefined) {
    if (!file) return;
    if (photos.length >= 2) {
      toast.error("Pode cadastrar no máximo 2 fotos.");
      return;
    }
    setBusy(true);
    try {
      const data = await compressPhoto(file);
      setPhotos((current) => [...current, data].slice(0, 2));
    } catch {
      toast.error("Não foi possível usar essa imagem. Tente outra foto.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto">
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) {
              toast.error("Informe o nome do produto.");
              return;
            }
            const unitCents = parseBRL(unit);
            if (unitCents === null || unitCents <= 0) {
              toast.error("Informe o preço.");
              return;
            }
            upsertProduct({
              id: product?.id,
              name,
              brand,
              unitPrice: unitCents,
              stock: Math.max(0, Number(stock) || 0),
              photos,
            });
            toast.success(product ? "Produto atualizado." : "Produto cadastrado.");
            onOpenChange(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {product ? "Editar produto" : "Novo produto"}
            </DialogTitle>
            <DialogDescription>
              Marcas: Natura e Avon, O Boticário e Eudora. 1 ou 2 fotos.
            </DialogDescription>
          </DialogHeader>
          <Field label="Produto">
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
              required
            />
          </Field>
          <Field label="Marca">
            <BrandSelect value={brand} onChange={setBrand} />
          </Field>
          <Field label="Preço">
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="0,00"
              inputMode="decimal"
              required
            />
          </Field>
          <Field
            label="Quantidade em estoque"
            hint="Só você vê esse número. Na vitrine aparece apenas se está disponível."
          >
            <Input
              type="number"
              min={0}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Field>
          <Field
            label="Fotos"
            hint="A primeira é a capa. A cliente vê foto + nome na vitrine."
          >
            <div className="flex gap-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="size-20 rounded-md object-cover"
                  />
                  <button
                    type="button"
                    className="absolute -top-1.5 -right-1.5 flex size-7 items-center justify-center rounded-full bg-foreground text-background"
                    aria-label="Remover foto"
                    onClick={() =>
                      setPhotos((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
              {photos.length < 2 ? (
                <label className="flex size-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-input text-muted-foreground hover:bg-muted">
                  <ImagePlus className="size-5" />
                  <span className="text-xs">
                    {busy ? "Aguarde" : "Foto"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={busy}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      void addPhoto(file);
                    }}
                  />
                </label>
              ) : null}
            </div>
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={busy}>
              {product ? "Salvar" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function PaymentDialog({
  open,
  onOpenChange,
  client,
  purchases,
  payments,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
  purchases: Purchase[];
  payments: Payment[];
  onSaved?: (id: string) => void;
}) {
  const addPayment = useLedger((s) => s.addPayment);
  const openBuys = useMemo(
    () => openPurchases(client.id, purchases, payments),
    [client.id, purchases, payments],
  );
  const [purchaseId, setPurchaseId] = useState(openBuys[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayISO());

  useEffect(() => {
    if (!open) return;
    const first = openPurchases(client.id, purchases, payments)[0];
    setPurchaseId(first?.id ?? "");
    if (first) {
      const s = summarizePurchase(first, payments);
      const suggested = Math.min(s.remaining, s.installmentValue);
      setAmount((suggested / 100).toFixed(2).replace(".", ","));
    } else {
      setAmount("");
    }
    setDate(todayISO());
  }, [open, client.id, purchases, payments]);

  const selected =
    openBuys.find((p) => p.id === purchaseId) ?? openBuys[0] ?? null;
  const summary = selected
    ? summarizePurchase(selected, payments)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!selected) {
              toast.error("Não há compras em aberto.");
              return;
            }
            const parsed = parseBRL(amount);
            if (parsed === null || parsed <= 0) {
              toast.error("Informe um valor válido.");
              return;
            }
            const remaining = summarizePurchase(selected, payments).remaining;
            if (parsed > remaining) {
              toast.error(
                `O valor não pode passar do saldo desta compra (${formatBRL(remaining)}).`,
              );
              return;
            }
            const id = addPayment({
              clientId: client.id,
              purchaseId: selected.id,
              amount: parsed,
              date,
            });
            toast.success("Pagamento registrado.");
            onSaved?.(id);
            onOpenChange(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Registrar pagamento</DialogTitle>
            <DialogDescription>
              Cada pagamento reduz o saldo e as parcelas que faltam.
            </DialogDescription>
          </DialogHeader>
          {openBuys.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {client.name} não tem compras em aberto.
            </p>
          ) : (
            <>
              <Field label="Compra">
                <NativeSelect
                  value={selected?.id ?? ""}
                  onChange={(e) => {
                    const next = openBuys.find((p) => p.id === e.target.value);
                    setPurchaseId(e.target.value);
                    if (next) {
                      const s = summarizePurchase(next, payments);
                      setAmount(
                        (s.installmentValue / 100).toFixed(2).replace(".", ","),
                      );
                    }
                  }}
                >
                  {openBuys.map((p) => {
                    const s = summarizePurchase(p, payments);
                    return (
                      <option key={p.id} value={p.id}>
                        {p.product} · resta {formatBRL(s.remaining)}
                      </option>
                    );
                  })}
                </NativeSelect>
              </Field>
              {summary && selected ? (
                <p className="text-sm text-muted-foreground">
                  Faltam {summary.remainingInstallments}{" "}
                  {summary.remainingInstallments === 1 ? "parcela" : "parcelas"}{" "}
                  · saldo {formatBRL(summary.remaining)}
                </p>
              ) : null}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Valor pago">
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    inputMode="decimal"
                    required
                  />
                </Field>
                <Field label="Data do pagamento">
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Field>
              </div>
            </>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={openBuys.length === 0}>
              Registrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Excluir",
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
