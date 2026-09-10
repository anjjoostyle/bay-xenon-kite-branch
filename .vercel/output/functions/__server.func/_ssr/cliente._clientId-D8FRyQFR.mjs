import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as formatDate, i as formatBRL, l as summarizeClient, m as useLedger, n as Button, p as useHydrated, r as cn, u as summarizePurchase } from "./use-hydrated-BZDoAE_4.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Plus, d as Banknote, f as ArrowLeft, l as Pencil, o as Receipt, r as Trash2 } from "../_libs/lucide-react.mjs";
import { d as PaymentDialog, f as PurchaseDialog, n as Card, o as ClientDialog, s as ConfirmDialog, t as AppShell, u as LoadingScreen } from "./card-BC1IsPXK.mjs";
import { i as Route$2 } from "./router-B2gfwdAT.mjs";
import { t as Badge } from "./badge-Cd29tVmo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cliente._clientId-D8FRyQFR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Separator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "separator",
		className: cn("h-px w-full bg-border", className),
		...props
	});
}
function ClientPage() {
	const { clientId } = Route$2.useParams();
	const navigate = useNavigate();
	const hydrated = useHydrated();
	const client = useLedger((s) => s.clients.find((c) => c.id === clientId));
	const purchases = useLedger((s) => s.purchases.filter((p) => p.clientId === clientId));
	const payments = useLedger((s) => s.payments.filter((p) => p.clientId === clientId));
	const allPurchases = useLedger((s) => s.purchases);
	const allPayments = useLedger((s) => s.payments);
	const deleteClient = useLedger((s) => s.deleteClient);
	const deletePurchase = useLedger((s) => s.deletePurchase);
	const deletePayment = useLedger((s) => s.deletePayment);
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [buyOpen, setBuyOpen] = (0, import_react.useState)(false);
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [confirmClient, setConfirmClient] = (0, import_react.useState)(false);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const summary = (0, import_react.useMemo)(() => summarizeClient(clientId, allPurchases, allPayments), [
		clientId,
		allPurchases,
		allPayments
	]);
	const orderedPurchases = (0, import_react.useMemo)(() => [...purchases].sort((a, b) => a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date)), [purchases]);
	const orderedPayments = (0, import_react.useMemo)(() => [...payments].sort((a, b) => a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date)), [payments]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	if (!client) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-display text-2xl",
		children: "Cliente não encontrado"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		className: "mt-4",
		variant: "outline",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			children: "Voltar à lista"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Ficha do cliente",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-4 inline-flex h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Clientes"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-medium tracking-tight",
						children: client.name
					}), client.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: client.phone
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: () => setEditOpen(true),
						"aria-label": "Editar cliente",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: () => setConfirmClient(true),
						"aria-label": "Excluir cliente",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Total comprado",
						value: formatBRL(summary.purchased)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Total pago",
						value: formatBRL(summary.paid)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Saldo",
						value: formatBRL(summary.balance),
						emphasize: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Parcelas restantes",
						value: String(summary.remainingInstallments)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setBuyOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Nova compra"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => setPayOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, {}), "Registrar pagamento"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-medium",
						children: "Compras"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Cada nova compra soma no total acima."
					}),
					orderedPurchases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "mt-3 px-5 py-8 text-center text-sm text-muted-foreground",
						children: "Nenhuma compra lançada ainda."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-3",
						children: orderedPurchases.map((purchase) => {
							const s = summarizePurchase(purchase, payments);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium",
												children: purchase.product
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-0.5 text-sm text-muted-foreground",
												children: [
													formatDate(purchase.date),
													" · ",
													purchase.receiptNumber,
													" ·",
													" ",
													purchase.installments === 1 ? "à vista" : `${purchase.installments}x`
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "shrink-0 font-medium tabular-nums",
											children: formatBRL(purchase.amount)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-center gap-2",
										children: [s.settled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "success",
											children: "Quitado"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "warn",
											children: [
												"Faltam ",
												s.remainingInstallments,
												" ",
												s.remainingInstallments === 1 ? "parcela" : "parcelas"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm text-muted-foreground",
											children: [
												"Pago ",
												formatBRL(s.paid),
												" · saldo ",
												formatBRL(s.remaining)
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/recibo/compra/$purchaseId",
												params: { purchaseId: purchase.id },
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {}), "Comprovante de compra"]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => setPendingDelete({
												type: "purchase",
												id: purchase.id
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Excluir"]
										})]
									})
								]
							}) }, purchase.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-medium",
					children: "Pagamentos"
				}), orderedPayments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "mt-3 px-5 py-8 text-center text-sm text-muted-foreground",
					children: "Nenhum pagamento registrado."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-3",
					children: orderedPayments.map((payment) => {
						const purchase = purchases.find((p) => p.id === payment.purchaseId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-start justify-between gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium tabular-nums",
										children: formatBRL(payment.amount)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-sm text-muted-foreground",
										children: [
											formatDate(payment.date),
											" · ",
											payment.receiptNumber,
											purchase ? ` · ${purchase.product}` : ""
										]
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/recibo/pagamento/$paymentId",
										params: { paymentId: payment.id },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {}), "Comprovante de pagamento"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => setPendingDelete({
										type: "payment",
										id: payment.id
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Excluir"]
								})]
							})]
						}) }, payment.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientDialog, {
				open: editOpen,
				onOpenChange: setEditOpen,
				client
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchaseDialog, {
				open: buyOpen,
				onOpenChange: setBuyOpen,
				client,
				onSaved: (id) => navigate({
					to: "/recibo/compra/$purchaseId",
					params: { purchaseId: id }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
				open: payOpen,
				onOpenChange: setPayOpen,
				client,
				purchases: allPurchases,
				payments: allPayments,
				onSaved: (id) => navigate({
					to: "/recibo/pagamento/$paymentId",
					params: { paymentId: id }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmClient,
				onOpenChange: setConfirmClient,
				title: "Excluir cliente?",
				description: "Isso apaga as compras, os pagamentos e os comprovantes desta ficha.",
				onConfirm: () => {
					deleteClient(client.id);
					navigate({ to: "/" });
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: pendingDelete !== null,
				onOpenChange: (next) => {
					if (!next) setPendingDelete(null);
				},
				title: pendingDelete?.type === "payment" ? "Excluir pagamento?" : "Excluir compra?",
				description: pendingDelete?.type === "purchase" ? "Os pagamentos desta compra também serão apagados." : "O saldo e as parcelas restantes voltam a considerar este valor.",
				onConfirm: () => {
					if (!pendingDelete) return;
					if (pendingDelete.type === "purchase") deletePurchase(pendingDelete.id);
					else deletePayment(pendingDelete.id);
					setPendingDelete(null);
				}
			})
		]
	});
}
function Metric({ label, value, emphasize }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] tracking-wide text-muted-foreground uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 tabular-nums ${emphasize ? "font-display text-xl font-medium text-primary" : "font-medium"}`,
			children: value
		})]
	});
}
//#endregion
export { ClientPage as component };
