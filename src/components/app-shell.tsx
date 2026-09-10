import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Package, Settings, ShoppingBag, Users } from "lucide-react";
import { BrandMark } from "./brand-mark";

const NAV = [
  { to: "/", label: "Clientes", icon: Users },
  { to: "/produtos", label: "Produtos", icon: Package },
  { to: "/pronta-entrega", label: "Pronta entrega", icon: ShoppingBag },
] as const;

export function AppShell({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="relative min-h-dvh">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-10 border-r border-rule/70 md:block"
      />
      <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(5.5rem,env(safe-area-inset-bottom))] md:px-8 md:pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <header className="no-print flex items-center justify-between gap-3 py-4">
          <Link
            to="/"
            className="flex min-h-11 items-center gap-2.5 text-foreground"
          >
            <BrandMark className="size-8 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight">
                Caderneta
              </span>
              <span className="mt-1 text-[11px] tracking-wide text-muted-foreground uppercase">
                {title ?? "Clientes e contas"}
              </span>
            </span>
          </Link>
          <Link
            to="/ajustes"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Ajustes da loja"
          >
            <Settings className="size-5" />
          </Link>
        </header>
        <nav className="no-print mb-5 hidden gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              activeProps={{
                className:
                  "inline-flex h-11 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1 pb-8">{children}</main>
      </div>
      <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden">
        <ul className="mx-auto grid max-w-3xl grid-cols-3">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground"
                activeProps={{ className: "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] text-primary" }}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function PublicShell({
  children,
  kicker,
}: {
  children: ReactNode;
  kicker?: string;
}) {
  return (
    <div className="min-h-dvh bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase">
          {kicker ?? "Caderneta"}
        </p>
        {children}
      </div>
    </div>
  );
}

