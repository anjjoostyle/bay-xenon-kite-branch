import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as summarizeShop, i as formatBRL, l as summarizeClient, m as useLedger, n as Button, p as useHydrated } from "./use-hydrated-BZDoAE_4.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Search, c as Plus, u as ChevronRight } from "../_libs/lucide-react.mjs";
import { l as Input, n as Card, o as ClientDialog, t as AppShell, u as LoadingScreen } from "./card-BC1IsPXK.mjs";
import { t as Badge } from "./badge-Cd29tVmo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CYiOc9-P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const hydrated = useHydrated();
	const clients = useLedger((s) => s.clients);
	const purchases = useLedger((s) => s.purchases);
	const payments = useLedger((s) => s.payments);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const shop = (0, import_react.useMemo)(() => summarizeShop(purchases, payments), [purchases, payments]);
	const rows = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return clients.map((client) => ({
			client,
			summary: summarizeClient(client.id, purchases, payments)
		})).filter(({ client, summary }) => {
			if (filter === "open" && summary.balance <= 0) return false;
			if (filter === "settled" && summary.balance > 0) return false;
			if (!q) return true;
			return client.name.toLowerCase().includes(q) || client.phone.toLowerCase().includes(q);
		}).sort((a, b) => a.client.name.localeCompare(b.client.name, "pt-BR"));
	}, [
		clients,
		purchases,
		payments,
		query,
		filter
	]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "pb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "A receber"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-4xl font-medium tracking-tight tabular-nums sm:text-5xl",
					children: formatBRL(shop.balance)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Vendido",
							value: formatBRL(shop.purchased)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Recebido",
							value: formatBRL(shop.paid)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Parcelas em aberto",
							value: String(shop.remainingInstallments),
							className: "col-span-2 sm:col-span-1"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Buscar cliente",
					className: "pl-10",
					"aria-label": "Buscar cliente"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "w-full sm:w-auto",
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Novo cliente"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex gap-2 overflow-x-auto pb-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: filter === "all",
					onClick: () => setFilter("all"),
					children: "Todos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: filter === "open",
					onClick: () => setFilter("open"),
					children: "Com saldo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: filter === "settled",
					onClick: () => setFilter("settled"),
					children: "Em dia"
				})
			]
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "px-5 py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-medium",
					children: clients.length === 0 ? "Nenhum cliente ainda" : "Nada encontrado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-sm text-sm text-muted-foreground",
					children: clients.length === 0 ? "Cadastre o primeiro cliente para lançar compras, acompanhar parcelas e emitir comprovantes." : "Tente outro nome ou limpe o filtro."
				}),
				clients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-5",
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Cadastrar cliente"]
				}) : null
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-3",
			children: rows.map(({ client, summary }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cliente/$clientId",
				params: { clientId: client.id },
				className: "block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-center gap-3 px-4 py-4 transition-colors duration-150 hover:bg-muted/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: client.name
							}), summary.balance > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "warn",
								children: [
									summary.remainingInstallments,
									" ",
									summary.remainingInstallments === 1 ? "parcela" : "parcelas"
								]
							}) : summary.purchaseCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "success",
								children: "Em dia"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Sem compras" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Comprou ",
								formatBRL(summary.purchased),
								" · pago",
								" ",
								formatBRL(summary.paid)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[11px] tracking-wide text-muted-foreground uppercase",
								children: "Saldo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium tabular-nums",
								children: formatBRL(summary.balance)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" })]
					})]
				})
			}) }, client.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
function Stat({ label, value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-lg border border-border bg-card px-4 py-3 ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] tracking-wide text-muted-foreground uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium tabular-nums",
			children: value
		})]
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `h-11 shrink-0 rounded-full px-4 text-sm font-medium ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
		children
	});
}
//#endregion
export { Home as component };
