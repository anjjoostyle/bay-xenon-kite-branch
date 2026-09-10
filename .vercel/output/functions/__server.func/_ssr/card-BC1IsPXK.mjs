import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { c as parseBRL, f as todayISO, i as formatBRL, m as useLedger, n as Button, r as cn, s as openPurchases, t as BrandMark, u as summarizePurchase } from "./use-hydrated-BZDoAE_4.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Settings, t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-BC1IsPXK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppShell({ children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-y-0 left-0 hidden w-10 border-r border-rule/70 md:block"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "no-print flex items-center justify-between gap-3 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-h-11 items-center gap-2.5 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold tracking-tight",
							children: "Caderneta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 text-[11px] tracking-wide text-muted-foreground uppercase",
							children: title ?? "Clientes e contas"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ajustes",
					className: "inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground",
					"aria-label": "Ajustes da loja",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pb-8",
				children
			})]
		})]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Fechar"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-medium tracking-tight text-foreground", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var fieldClass = "flex h-11 w-full rounded-md border border-input bg-card px-3 text-base text-foreground shadow-none transition-colors duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn(fieldClass, className),
		...props
	});
}
function NativeSelect({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(fieldClass, "pr-8", className),
		...props,
		children
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-foreground",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function ClientDialog({ open, onOpenChange, client, onSaved }) {
	const addClient = useLedger((s) => s.addClient);
	const updateClient = useLedger((s) => s.updateClient);
	const [name, setName] = (0, import_react.useState)(client?.name ?? "");
	const [phone, setPhone] = (0, import_react.useState)(client?.phone ?? "");
	const reset = (next) => {
		setName(next?.name ?? "");
		setPhone(next?.phone ?? "");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (next) reset(client);
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (e) => {
				e.preventDefault();
				const trimmed = name.trim();
				if (!trimmed) {
					toast.error("Informe o nome do cliente.");
					return;
				}
				if (client) {
					updateClient(client.id, {
						name: trimmed,
						phone
					});
					toast.success("Cliente atualizado.");
					onSaved?.(client.id);
				} else {
					const id = addClient({
						name: trimmed,
						phone
					});
					toast.success("Cliente cadastrado.");
					onSaved?.(id);
				}
				onOpenChange(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: client ? "Editar cliente" : "Novo cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "O total das compras aparece na ficha dele, e cresce a cada venda." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nome",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Nome completo",
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Telefone",
					hint: "Opcional",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						placeholder: "(00) 00000-0000",
						inputMode: "tel"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: client ? "Salvar" : "Cadastrar"
				})] })
			]
		}) })
	});
}
function PurchaseDialog({ open, onOpenChange, client, onSaved }) {
	const addPurchase = useLedger((s) => s.addPurchase);
	const [product, setProduct] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const [installments, setInstallments] = (0, import_react.useState)("1");
	const parsed = parseBRL(amount);
	const inst = Number(installments) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (next) {
				setProduct("");
				setAmount("");
				setDate(todayISO());
				setInstallments("1");
			}
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (e) => {
				e.preventDefault();
				if (!product.trim()) {
					toast.error("Informe o produto.");
					return;
				}
				if (parsed === null || parsed <= 0) {
					toast.error("Informe um valor válido.");
					return;
				}
				const id = addPurchase({
					clientId: client.id,
					product,
					amount: parsed,
					date,
					installments: Math.min(24, Math.max(1, inst))
				});
				toast.success("Compra lançada. O total do cliente foi atualizado.");
				onSaved?.(id);
				onOpenChange(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nova compra" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Venda para ",
					client.name,
					". O valor entra no total acumulado."
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Produto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						value: product,
						onChange: (e) => setProduct(e.target.value),
						placeholder: "O que foi comprado",
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Valor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							placeholder: "0,00",
							inputMode: "decimal",
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Data",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value),
							required: true
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Parcelas",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: installments,
						onChange: (e) => setInstallments(e.target.value),
						children: Array.from({ length: 24 }, (_, i) => i + 1).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: n,
							children: n === 1 ? "À vista (1x)" : `${n}x`
						}, n))
					})
				}),
				parsed && parsed > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						inst,
						"x de ",
						formatBRL(Math.round(parsed / inst))
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Lançar compra"
				})] })
			]
		}) })
	});
}
function PaymentDialog({ open, onOpenChange, client, purchases, payments, onSaved }) {
	const addPayment = useLedger((s) => s.addPayment);
	const openBuys = (0, import_react.useMemo)(() => openPurchases(client.id, purchases, payments), [
		client.id,
		purchases,
		payments
	]);
	const [purchaseId, setPurchaseId] = (0, import_react.useState)(openBuys[0]?.id ?? "");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const selected = openBuys.find((p) => p.id === purchaseId) ?? openBuys[0] ?? null;
	const summary = selected ? summarizePurchase(selected, payments) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (next) {
				const first = openPurchases(client.id, purchases, payments)[0];
				setPurchaseId(first?.id ?? "");
				if (first) {
					const s = summarizePurchase(first, payments);
					setAmount((s.installmentValue / 100).toFixed(2).replace(".", ","));
				} else setAmount("");
				setDate(todayISO());
			}
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (e) => {
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
					toast.error(`O valor não pode passar do saldo desta compra (${formatBRL(remaining)}).`);
					return;
				}
				const id = addPayment({
					clientId: client.id,
					purchaseId: selected.id,
					amount: parsed,
					date
				});
				toast.success("Pagamento registrado.");
				onSaved?.(id);
				onOpenChange(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Registrar pagamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Cada pagamento reduz o saldo e as parcelas que faltam." })] }),
				openBuys.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [client.name, " não tem compras em aberto."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Compra",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: selected?.id ?? "",
							onChange: (e) => {
								const next = openBuys.find((p) => p.id === e.target.value);
								setPurchaseId(e.target.value);
								if (next) {
									const s = summarizePurchase(next, payments);
									setAmount((s.installmentValue / 100).toFixed(2).replace(".", ","));
								}
							},
							children: openBuys.map((p) => {
								const s = summarizePurchase(p, payments);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: p.id,
									children: [
										p.product,
										" · resta ",
										formatBRL(s.remaining)
									]
								}, p.id);
							})
						})
					}),
					summary && selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Faltam ",
							summary.remainingInstallments,
							" ",
							summary.remainingInstallments === 1 ? "parcela" : "parcelas",
							" ",
							"· saldo ",
							formatBRL(summary.remaining)
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Valor pago",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: amount,
								onChange: (e) => setAmount(e.target.value),
								placeholder: "0,00",
								inputMode: "decimal",
								required: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Data do pagamento",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value),
								required: true
							})
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: openBuys.length === 0,
					children: "Registrar"
				})] })
			]
		}) })
	});
}
function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel = "Excluir", onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: description })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: () => onOpenChange(false),
			children: "Cancelar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "destructive",
			onClick: () => {
				onConfirm();
				onOpenChange(false);
			},
			children: confirmLabel
		})] })] })
	});
}
function LoadingScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "A receber"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-4xl font-medium tracking-tight",
			children: "Carregando contas…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-36 animate-pulse rounded-xl bg-muted" })
	] });
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-card text-card-foreground", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 p-5", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-display text-lg font-medium tracking-tight", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("px-5 pb-5", className),
		...props
	});
}
//#endregion
export { CardTitle as a, Field as c, PaymentDialog as d, PurchaseDialog as f, CardHeader as i, Input as l, Card as n, ClientDialog as o, CardContent as r, ConfirmDialog as s, AppShell as t, LoadingScreen as u };
