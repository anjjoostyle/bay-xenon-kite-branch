import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as useLedger, n as Button, p as useHydrated } from "./use-hydrated-BZDoAE_4.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as CardTitle, c as Field, i as CardHeader, l as Input, n as Card, r as CardContent, s as ConfirmDialog, t as AppShell, u as LoadingScreen } from "./card-BC1IsPXK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ajustes-BQoenn-S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const hydrated = useHydrated();
	const settings = useLedger((s) => s.settings);
	const updateSettings = useLedger((s) => s.updateSettings);
	const clearAll = useLedger((s) => s.clearAll);
	const loadDemo = useLedger((s) => s.loadDemo);
	const [clearOpen, setClearOpen] = (0, import_react.useState)(false);
	const [demoOpen, setDemoOpen] = (0, import_react.useState)(false);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Ajustes",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-4 inline-flex h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Clientes"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-medium tracking-tight",
				children: "Dados da loja"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Esses dados aparecem nos comprovantes de compra e de pagamento."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Identificação" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => {
						e.preventDefault();
						const form = e.currentTarget;
						const data = new FormData(form);
						updateSettings({
							businessName: String(data.get("businessName") ?? "").trim(),
							phone: String(data.get("phone") ?? "").trim(),
							city: String(data.get("city") ?? "").trim(),
							document: String(data.get("document") ?? "").trim()
						});
						toast.success("Dados da loja salvos.");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome da loja",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "businessName",
								defaultValue: settings.businessName,
								placeholder: "Minha Loja"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Telefone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "phone",
								defaultValue: settings.phone,
								placeholder: "(00) 00000-0000",
								inputMode: "tel"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Cidade",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "city",
								defaultValue: settings.city,
								placeholder: "Cidade, UF"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "CNPJ ou CPF",
							hint: "Opcional, sai no comprovante",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "document",
								defaultValue: settings.document,
								placeholder: "00.000.000/0000-00"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full sm:w-auto",
							children: "Salvar"
						})
					]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Dados deste aparelho" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Tudo fica salvo neste navegador. Para começar do zero, apague os clientes de exemplo."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setDemoOpen(true),
							children: "Carregar exemplo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							onClick: () => setClearOpen(true),
							children: "Apagar todos os dados"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: clearOpen,
				onOpenChange: setClearOpen,
				title: "Apagar todos os dados?",
				description: "Clientes, compras, pagamentos e comprovantes serão removidos deste aparelho.",
				confirmLabel: "Apagar tudo",
				onConfirm: () => {
					clearAll();
					toast.success("Dados apagados.");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: demoOpen,
				onOpenChange: setDemoOpen,
				title: "Carregar dados de exemplo?",
				description: "Isso substitui os clientes atuais por três fichas de demonstração.",
				confirmLabel: "Carregar",
				onConfirm: () => {
					loadDemo();
					toast.success("Exemplo carregado.");
				}
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
