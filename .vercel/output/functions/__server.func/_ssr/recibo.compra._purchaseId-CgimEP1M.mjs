import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as useLedger, n as Button, p as useHydrated } from "./use-hydrated-BZDoAE_4.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$1 } from "./router-B2gfwdAT.mjs";
import { n as PurchaseReceipt } from "./receipt-view-CFK4SmDN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recibo.compra._purchaseId-CgimEP1M.js
var import_jsx_runtime = require_jsx_runtime();
function PurchaseReceiptPage() {
	const { purchaseId } = Route$1.useParams();
	const hydrated = useHydrated();
	const purchase = useLedger((s) => s.purchases.find((p) => p.id === purchaseId));
	const client = useLedger((s) => purchase ? s.clients.find((c) => c.id === purchase.clientId) : void 0);
	const payments = useLedger((s) => purchase ? s.payments.filter((p) => p.purchaseId === purchase.id) : []);
	const settings = useLedger((s) => s.settings);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-background" });
	if (!purchase || !client) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchaseReceipt, {
		purchase,
		client,
		payments,
		settings
	});
}
//#endregion
export { PurchaseReceiptPage as component };
