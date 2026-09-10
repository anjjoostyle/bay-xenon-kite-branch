import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./use-hydrated-BZDoAE_4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-Cd29tVmo.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		outline: "border-border text-foreground",
		muted: "border-transparent bg-muted text-muted-foreground",
		success: "border-transparent bg-primary/12 text-primary",
		warn: "border-transparent bg-destructive/10 text-destructive"
	} },
	defaultVariants: { variant: "muted" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
