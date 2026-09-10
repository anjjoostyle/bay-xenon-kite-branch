import { AppShell } from "@/components/app-shell";

export function LoadingScreen() {
  return (
    <AppShell>
      <p className="text-sm text-muted-foreground">A receber</p>
      <p className="mt-1 font-display text-4xl font-medium tracking-tight">
        Carregando contas…
      </p>
      <div className="mt-6 h-36 animate-pulse rounded-xl bg-muted" />
    </AppShell>
  );
}
