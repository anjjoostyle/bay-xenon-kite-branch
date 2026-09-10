import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ConfirmDialog } from "@/components/forms";
import { LoadingScreen } from "@/components/loading-screen";
import { useHydrated } from "@/components/use-hydrated";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { useLedger } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/ajustes")({ component: SettingsPage });

function SettingsPage() {
  const hydrated = useHydrated();
  const settings = useLedger((s) => s.settings);
  const updateSettings = useLedger((s) => s.updateSettings);
  const clearAll = useLedger((s) => s.clearAll);
  const loadDemo = useLedger((s) => s.loadDemo);
  const [clearOpen, setClearOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  if (!hydrated) {
    return <LoadingScreen />;
  }

  return (
    <AppShell title="Ajustes">
      <Link
        to="/"
        className="mb-4 inline-flex h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Clientes
      </Link>
      <h1 className="font-display text-3xl font-medium tracking-tight">
        Dados da loja
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Esses dados aparecem nos comprovantes e nos links da vitrine e da conta.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Onde os links ficam hospedados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            O Grok publica o Caderneta como um site. O endereço público aparece
            quando você clica em <strong className="text-foreground">Publicar</strong>.
            A vitrine e as contas dos clientes são páginas curtas desse mesmo site:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Vitrine: <span className="font-mono text-foreground">/loja</span>
            </li>
            <li>
              Conta: <span className="font-mono text-foreground">/c/ANA07</span>{" "}
              (5 letras, uma por cliente)
            </li>
          </ul>
          <p>
            Enquanto você testa aqui, o endereço é só da prévia — por isso o
            copiar pode falhar e o link ainda não serve para mandar ao cliente.
            Depois de publicar, abra o site publicado, cadastre os produtos e
            envie os links de lá.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Identificação</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              updateSettings({
                businessName: String(data.get("businessName") ?? "").trim(),
                phone: String(data.get("phone") ?? "").trim(),
                city: String(data.get("city") ?? "").trim(),
                document: String(data.get("document") ?? "").trim(),
              });
              toast.success("Dados da loja salvos.");
            }}
          >
            <Field label="Nome da loja">
              <Input
                name="businessName"
                defaultValue={settings.businessName}
                placeholder="Minha Loja"
              />
            </Field>
            <Field label="Telefone">
              <Input
                name="phone"
                defaultValue={settings.phone}
                placeholder="(00) 00000-0000"
                inputMode="tel"
              />
            </Field>
            <Field label="Cidade">
              <Input
                name="city"
                defaultValue={settings.city}
                placeholder="Cidade, UF"
              />
            </Field>
            <Field label="CNPJ ou CPF" hint="Opcional, sai no comprovante">
              <Input
                name="document"
                defaultValue={settings.document}
                placeholder="00.000.000/0000-00"
              />
            </Field>
            <Button type="submit" className="w-full sm:w-auto">
              Salvar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Dados deste aparelho</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Tudo fica salvo neste navegador. Para começar do zero, apague os
            clientes de exemplo.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => setDemoOpen(true)}>
              Carregar exemplo
            </Button>
            <Button variant="destructive" onClick={() => setClearOpen(true)}>
              Apagar todos os dados
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={clearOpen}
        onOpenChange={setClearOpen}
        title="Apagar todos os dados?"
        description="Clientes, compras, pagamentos e comprovantes serão removidos deste aparelho."
        confirmLabel="Apagar tudo"
        onConfirm={() => {
          clearAll();
          toast.success("Dados apagados.");
        }}
      />
      <ConfirmDialog
        open={demoOpen}
        onOpenChange={setDemoOpen}
        title="Carregar dados de exemplo?"
        description="Isso substitui os clientes atuais por três fichas de demonstração."
        confirmLabel="Carregar"
        onConfirm={() => {
          loadDemo();
          toast.success("Exemplo carregado.");
        }}
      />
    </AppShell>
  );
}
