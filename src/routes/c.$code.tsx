import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getPublicPage } from "@/lib/api";
import { formatBRL, formatDate } from "@/lib/money";
import type { StatementPayload } from "@/lib/types";

export const Route = createFileRoute("/c/$code")({
  component: StatementPage,
});

function StatementPage() {
  const { code } = Route.useParams();
  const [data, setData] = useState<StatementPayload | null | undefined>(
    undefined,
  );

  useEffect(() => {
    void getPublicPage({ data: { key: `conta:${code}` } }).then((payload) => {
      setData((payload as StatementPayload | null) ?? null);
    });
  }, [code]);

  if (data === undefined) {
    return (
      <PublicShell kicker="Minha conta">
        <p className="mt-6 text-muted-foreground">Carregando sua conta…</p>
      </PublicShell>
    );
  }

  if (!data) {
    return (
      <PublicShell kicker="Minha conta">
        <h1 className="mt-2 font-display text-3xl font-medium">
          Conta não encontrada
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Peça um novo link para a consultora.
        </p>
      </PublicShell>
    );
  }

  return (
    <PublicShell kicker="Acompanhar compras">
      <p className="mt-1 text-sm text-muted-foreground">
        {data.shop.businessName}
      </p>
      <h1 className="mt-1 font-display text-3xl font-medium tracking-tight">
        {data.clientName}
      </h1>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Saldo
          </p>
          <p className="mt-1 font-display text-xl font-medium text-primary tabular-nums">
            {formatBRL(data.balance)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Parcelas
          </p>
          <p className="mt-1 font-medium tabular-nums">
            {data.remainingInstallments}
          </p>
        </Card>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Comprado {formatBRL(data.purchased)} · pago {formatBRL(data.paid)}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {data.purchases.map((purchase, index) => (
          <li key={`${purchase.product}-${purchase.date}-${index}`}>
            <Card className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">{purchase.product}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {purchase.brand} · {formatDate(purchase.date)}
                  </p>
                </div>
                <p className="font-medium tabular-nums">
                  {formatBRL(purchase.amount)}
                </p>
              </div>
              <div className="mt-3">
                {purchase.settled ? (
                  <Badge variant="success">Quitado</Badge>
                ) : (
                  <Badge variant="warn">
                    Faltam {purchase.remainingInstallments}{" "}
                    {purchase.remainingInstallments === 1
                      ? "parcela"
                      : "parcelas"}{" "}
                    · saldo {formatBRL(purchase.remaining)}
                  </Badge>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </PublicShell>
  );
}
