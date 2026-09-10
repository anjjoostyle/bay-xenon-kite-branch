import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as useLedger, n as Button, p as useHydrated } from "./use-hydrated-BZDoAE_4.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-B2gfwdAT.mjs";
import { t as PaymentReceipt } from "./receipt-view-CFK4SmDN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recibo.pagamento._paymentId-B0XZPsQE.js
var import_jsx_runtime = require_jsx_runtime();
function PaymentReceiptPage() {
	const { paymentId } = Route.useParams();
	const hydrated = useHydrated();
	const payment = useLedger((s) => s.payments.find((p) => p.id === paymentId));
	const purchase = useLedger((s) => payment ? s.purchases.find((p) => p.id === payment.purchaseId) : void 0);
	const client = useLedger((s) => payment ? s.clients.find((c) => c.id === payment.clientId) : void 0);
	const payments = useLedger((s) => s.payments);
	const purchases = useLedger((s) => s.purchases);
	const settings = useLedger((s) => s.settings);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-background" });
	if (!payment || !purchase || !client) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-3 px-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "Comprovante não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Voltar"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentReceipt, {
		payment,
		purchase,
		client,
		payments: payments.filter((p) => p.clientId === client.id),
		allPurchases: purchases.filter((p) => p.clientId === client.id),
		settings
	});
}
//#endregion
export { PaymentReceiptPage as component };
