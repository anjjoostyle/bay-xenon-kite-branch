import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ClientDialog } from "@/components/forms";
import { LoadingScreen } from "@/components/loading-screen";
import { useHydrated } from "@/components/use-hydrated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { summarizeClient, summarizeShop } from "@/lib/ledger";
import { formatBRL } from "@/lib/money";
import { useLedger } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

type Filter = "all" | "open" | "settled";

function Home() {
  const hydrated = useHydrated();
  const clients = useLedger((s) => s.clients);
  const purchases = useLedger((s) => s.purchases);
  const payments = useLedger((s) => s.payments);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState(false);

  const shop = useMemo(
    () => summarizeShop(purchases, payments),
    [purchases, payments],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients
      .map((client) => ({
        client,
        summary: summarizeClient(client.id, purchases, payments),
      }))
      .filter(({ client, summary }) => {
        if (filter === "open" && summary.balance <= 0) return false;
        if (filter === "settled" && summary.balance > 0) return false;
        if (!q) return true;
        return (
          client.name.toLowerCase().includes(q) ||
          client.phone.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.client.name.localeCompare(b.client.name, "pt-BR"));
  }, [clients, purchases, payments, query, filter]);

  if (!hydrated) {
    return <LoadingScreen />;
  }

  return (
    <AppShell>
      <section className="pb-6">
        <p className="text-sm text-muted-foreground">A receber</p>
        <p className="mt-1 font-display text-4xl font-medium tracking-tight tabular-nums sm:text-5xl">
          {formatBRL(shop.balance)}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Vendido" value={formatBRL(shop.purchased)} />
          <Stat label="Recebido" value={formatBRL(shop.paid)} />
          <Stat
            label="Parcelas em aberto"
            value={String(shop.remainingInstallments)}
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </section>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cliente"
            className="pl-10"
            aria-label="Buscar cliente"
          />
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setOpen(true)}>
          <Plus />
          Novo cliente
        </Button>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          Todos
        </FilterChip>
        <FilterChip active={filter === "open"} onClick={() => setFilter("open")}>
          Com saldo
        </FilterChip>
        <FilterChip
          active={filter === "settled"}
          onClick={() => setFilter("settled")}
        >
          Em dia
        </FilterChip>
      </div>

      {rows.length === 0 ? (
        <Card className="px-5 py-12 text-center">
          <p className="font-display text-xl font-medium">
            {clients.length === 0 ? "Nenhum cliente ainda" : "Nada encontrado"}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            {clients.length === 0
              ? "Cadastre o primeiro cliente para lançar compras, acompanhar parcelas e emitir comprovantes."
              : "Tente outro nome ou limpe o filtro."}
          </p>
          {clients.length === 0 ? (
            <Button className="mt-5" onClick={() => setOpen(true)}>
              <Plus />
              Cadastrar cliente
            </Button>
          ) : null}
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map(({ client, summary }) => (
            <li key={client.id}>
              <Link
                to="/cliente/$clientId"
                params={{ clientId: client.id }}
                className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <Card className="flex items-center gap-3 px-4 py-4 transition-colors duration-150 hover:bg-muted/60">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-medium">{client.name}</p>
                      {summary.balance > 0 ? (
                        <Badge variant="warn">
                          {summary.remainingInstallments}{" "}
                          {summary.remainingInstallments === 1
                            ? "parcela"
                            : "parcelas"}
                        </Badge>
                      ) : summary.purchaseCount > 0 ? (
                        <Badge variant="success">Em dia</Badge>
                      ) : (
                        <Badge>Sem compras</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Comprou {formatBRL(summary.purchased)} · pago{" "}
                      {formatBRL(summary.paid)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <p className="text-right">
                      <span className="block text-[11px] tracking-wide text-muted-foreground uppercase">
                        Saldo
                      </span>
                      <span className="font-medium tabular-nums">
                        {formatBRL(summary.balance)}
                      </span>
                    </p>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <ClientDialog open={open} onOpenChange={setOpen} />
    </AppShell>
  );
}

function Stat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-card px-4 py-3 ${className ?? ""}`}
    >
      <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 font-medium tabular-nums">{value}</p>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-11 shrink-0 rounded-full px-4 text-sm font-medium ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
