import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as formatBRL, l as summarizeClient, n as Button, o as formatDateLong, t as BrandMark, u as summarizePurchase } from "./use-hydrated-BZDoAE_4.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ArrowLeft, s as Printer } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receipt-view-CFK4SmDN.js
var import_jsx_runtime = require_jsx_runtime();
function ShopHeader({ settings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex items-start justify-between gap-4 border-b border-foreground/15 pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-semibold tracking-tight",
			children: settings.businessName || "Minha Loja"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [
				settings.document,
				settings.phone,
				settings.city
			].filter(Boolean).join(" · ") || "Comprovante gerado pela Caderneta"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "size-10 shrink-0 print:hidden" })]
	});
}
function ReceiptFrame({ title, number, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background px-4 py-6 print:bg-white print:px-0 print:py-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print mx-auto mb-4 flex w-full max-w-xl items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), "Voltar"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => window.print(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), "Imprimir / salvar PDF"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "print-sheet mx-auto w-full max-w-xl rounded-xl border border-border bg-card px-6 py-8 text-card-foreground print:max-w-none print:rounded-none print:border-0 print:px-10 print:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.18em] text-primary uppercase",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-sm text-muted-foreground",
					children: number
				}),
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "mt-10 grid grid-cols-2 gap-8 pt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-foreground/30 pt-2 text-center text-xs text-muted-foreground",
						children: "Assinatura da loja"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-foreground/30 pt-2 text-center text-xs text-muted-foreground",
						children: "Assinatura do cliente"
					})]
				})
			]
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-right text-sm font-medium",
			children: value
		})]
	});
}
function PurchaseReceipt({ purchase, client, payments, settings }) {
	const summary = summarizePurchase(purchase, payments);
	const clientSum = summarizeClient(client.id, [purchase], payments);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReceiptFrame, {
		title: "Comprovante de compra",
		number: purchase.receiptNumber,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl font-medium tracking-tight",
				children: purchase.product
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-muted-foreground",
				children: ["Emitido em ", formatDateLong(purchase.date)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 divide-y divide-border border-y border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Cliente",
						value: client.name
					}),
					client.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Telefone",
						value: client.phone
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Produto",
						value: purchase.product
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Valor da compra",
						value: formatBRL(purchase.amount)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Parcelas",
						value: purchase.installments === 1 ? "À vista" : `${purchase.installments}x de ${formatBRL(summary.installmentValue)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Parcelas restantes",
						value: summary.settled ? "Quitado" : String(summary.remainingInstallments)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Saldo desta compra",
						value: formatBRL(summary.remaining)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 font-display text-2xl tabular-nums",
				children: ["Total ", formatBRL(purchase.amount)]
			}),
			clientSum.paid > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: ["Já pago nesta compra: ", formatBRL(summary.paid)]
			}) : null
		]
	});
}
function PaymentReceipt({ payment, purchase, client, payments, allPurchases, settings }) {
	const summary = summarizePurchase(purchase, payments);
	const clientSum = summarizeClient(client.id, allPurchases, payments);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReceiptFrame, {
		title: "Comprovante de pagamento",
		number: payment.receiptNumber,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl font-medium tracking-tight",
				children: formatBRL(payment.amount)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-muted-foreground",
				children: ["Recebido em ", formatDateLong(payment.date)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 divide-y divide-border border-y border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Cliente",
						value: client.name
					}),
					client.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Telefone",
						value: client.phone
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Referente a",
						value: purchase.product
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Compra nº",
						value: purchase.receiptNumber
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Valor da compra",
						value: formatBRL(purchase.amount)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Valor pago agora",
						value: formatBRL(payment.amount)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Total pago nesta compra",
						value: formatBRL(summary.paid)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Parcelas restantes",
						value: summary.settled ? "Nenhuma — compra quitada" : `${summary.remainingInstallments} de ${purchase.installments}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Saldo desta compra",
						value: formatBRL(summary.remaining)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Saldo total do cliente",
						value: formatBRL(clientSum.balance)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: summary.settled ? "Esta compra está quitada." : `Ainda faltam ${summary.remainingInstallments} ${summary.remainingInstallments === 1 ? "parcela" : "parcelas"} desta compra.`
			})
		]
	});
}
//#endregion
export { PurchaseReceipt as n, PaymentReceipt as t };
