import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-hydrated-BZDoAE_4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrandMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		fill: "none",
		"aria-hidden": "true",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "4",
				width: "20",
				height: "24",
				rx: "3",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "8",
				width: "10",
				height: "1.6",
				rx: "0.8",
				className: "fill-primary-foreground/90"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "12",
				width: "14",
				height: "1.6",
				rx: "0.8",
				className: "fill-primary-foreground/70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "16",
				width: "14",
				height: "1.6",
				rx: "0.8",
				className: "fill-primary-foreground/70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "20",
				width: "8",
				height: "1.6",
				rx: "0.8",
				className: "fill-primary-foreground/50"
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-border bg-card text-foreground hover:bg-muted",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "text-foreground hover:bg-muted",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3",
			lg: "h-12 rounded-md px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function summarizePurchase(purchase, payments) {
	const paid = payments.filter((p) => p.purchaseId === purchase.id).reduce((sum, p) => sum + p.amount, 0);
	const remaining = Math.max(0, purchase.amount - paid);
	const installmentValue = Math.round(purchase.amount / purchase.installments);
	const settled = remaining <= 0;
	return {
		paid,
		remaining,
		remainingInstallments: settled ? 0 : Math.min(purchase.installments, Math.max(1, Math.ceil(remaining / Math.max(installmentValue, 1)))),
		installmentValue,
		settled
	};
}
function summarizeClient(clientId, purchases, payments) {
	const clientPurchases = purchases.filter((p) => p.clientId === clientId);
	const clientPayments = payments.filter((p) => p.clientId === clientId);
	const purchased = clientPurchases.reduce((sum, p) => sum + p.amount, 0);
	const paid = clientPayments.reduce((sum, p) => sum + p.amount, 0);
	const remainingInstallments = clientPurchases.reduce((sum, purchase) => {
		return sum + summarizePurchase(purchase, clientPayments).remainingInstallments;
	}, 0);
	return {
		purchased,
		paid,
		balance: Math.max(0, purchased - paid),
		remainingInstallments,
		purchaseCount: clientPurchases.length,
		paymentCount: clientPayments.length
	};
}
function summarizeShop(purchases, payments) {
	const purchased = purchases.reduce((sum, p) => sum + p.amount, 0);
	const paid = payments.reduce((sum, p) => sum + p.amount, 0);
	const remainingInstallments = purchases.reduce((sum, purchase) => {
		return sum + summarizePurchase(purchase, payments).remainingInstallments;
	}, 0);
	return {
		purchased,
		paid,
		balance: Math.max(0, purchased - paid),
		remainingInstallments
	};
}
function openPurchases(clientId, purchases, payments) {
	return purchases.filter((p) => p.clientId === clientId).filter((p) => !summarizePurchase(p, payments).settled).sort((a, b) => a.date.localeCompare(b.date));
}
function formatBRL(cents) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(cents / 100);
}
/** Parse Brazilian money text into integer cents. Returns null if invalid. */
function parseBRL(raw) {
	const s = raw.replace(/[R$\s]/gi, "").trim();
	if (!s) return null;
	let n;
	if (s.includes(",")) n = Number(s.replace(/\./g, "").replace(",", "."));
	else if (s.includes(".")) {
		const parts = s.split(".");
		const last = parts[parts.length - 1] ?? "";
		n = parts.length === 2 && last.length <= 2 ? Number(s) : Number(s.replace(/\./g, ""));
	} else n = Number(s);
	if (!Number.isFinite(n) || n < 0) return null;
	return Math.round(n * 100);
}
function formatDate(iso) {
	const [y, m, d] = iso.split("-");
	if (!y || !m || !d) return iso;
	return `${d}/${m}/${y}`;
}
function formatDateLong(iso) {
	const date = /* @__PURE__ */ new Date(`${iso}T12:00:00`);
	if (Number.isNaN(date.getTime())) return iso;
	return new Intl.DateTimeFormat("pt-BR", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(date);
}
function todayISO() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function receiptCode(prefix, seq) {
	return `${prefix}-${String(seq).padStart(4, "0")}`;
}
var emptySettings = {
	businessName: "Minha Loja",
	phone: "",
	city: "",
	document: ""
};
function nid(prefix) {
	return `${prefix}-${crypto.randomUUID()}`;
}
function demoData() {
	return {
		clients: [
			{
				id: "cli-ana",
				name: "Ana Oliveira",
				phone: "(11) 98888-1010",
				createdAt: "2026-08-10T10:00:00.000Z"
			},
			{
				id: "cli-carlos",
				name: "Carlos Mendes",
				phone: "(21) 97777-2020",
				createdAt: "2026-08-15T10:00:00.000Z"
			},
			{
				id: "cli-juliana",
				name: "Juliana Costa",
				phone: "(31) 96666-3030",
				createdAt: "2026-09-01T10:00:00.000Z"
			}
		],
		purchases: [
			{
				id: "buy-ana-1",
				clientId: "cli-ana",
				product: "Kit skincare",
				amount: 36e3,
				date: "2026-08-10",
				installments: 3,
				receiptNumber: "C-0001",
				createdAt: "2026-08-10T10:00:00.000Z"
			},
			{
				id: "buy-carlos-1",
				clientId: "cli-carlos",
				product: "Tênis Runner Pro",
				amount: 48e3,
				date: "2026-08-15",
				installments: 4,
				receiptNumber: "C-0002",
				createdAt: "2026-08-15T10:00:00.000Z"
			},
			{
				id: "buy-juliana-1",
				clientId: "cli-juliana",
				product: "Bolsa de couro",
				amount: 25e3,
				date: "2026-09-01",
				installments: 1,
				receiptNumber: "C-0003",
				createdAt: "2026-09-01T10:00:00.000Z"
			}
		],
		payments: [
			{
				id: "pay-ana-1",
				clientId: "cli-ana",
				purchaseId: "buy-ana-1",
				amount: 12e3,
				date: "2026-08-20",
				receiptNumber: "P-0001",
				createdAt: "2026-08-20T10:00:00.000Z"
			},
			{
				id: "pay-ana-2",
				clientId: "cli-ana",
				purchaseId: "buy-ana-1",
				amount: 12e3,
				date: "2026-09-01",
				receiptNumber: "P-0002",
				createdAt: "2026-09-01T10:00:00.000Z"
			},
			{
				id: "pay-carlos-1",
				clientId: "cli-carlos",
				purchaseId: "buy-carlos-1",
				amount: 12e3,
				date: "2026-08-15",
				receiptNumber: "P-0003",
				createdAt: "2026-08-15T11:00:00.000Z"
			},
			{
				id: "pay-carlos-2",
				clientId: "cli-carlos",
				purchaseId: "buy-carlos-1",
				amount: 12e3,
				date: "2026-09-01",
				receiptNumber: "P-0004",
				createdAt: "2026-09-01T11:00:00.000Z"
			},
			{
				id: "pay-juliana-1",
				clientId: "cli-juliana",
				purchaseId: "buy-juliana-1",
				amount: 25e3,
				date: "2026-09-01",
				receiptNumber: "P-0005",
				createdAt: "2026-09-01T12:00:00.000Z"
			}
		],
		settings: {
			businessName: "Ateliê Aurora",
			phone: "(11) 3333-4040",
			city: "São Paulo, SP",
			document: "12.345.678/0001-90"
		},
		purchaseSeq: 3,
		paymentSeq: 5
	};
}
var useLedger = create()(persist((set, get) => ({
	hydrated: false,
	onboarded: false,
	clients: [],
	purchases: [],
	payments: [],
	settings: emptySettings,
	purchaseSeq: 0,
	paymentSeq: 0,
	setHydrated: (value) => set({ hydrated: value }),
	addClient: ({ name, phone }) => {
		const id = nid("cli");
		const client = {
			id,
			name: name.trim(),
			phone: phone.trim(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set((s) => ({ clients: [client, ...s.clients] }));
		return id;
	},
	updateClient: (id, patch) => {
		set((s) => ({ clients: s.clients.map((c) => c.id === id ? {
			...c,
			name: patch.name.trim(),
			phone: patch.phone.trim()
		} : c) }));
	},
	deleteClient: (id) => {
		set((s) => ({
			clients: s.clients.filter((c) => c.id !== id),
			purchases: s.purchases.filter((p) => p.clientId !== id),
			payments: s.payments.filter((p) => p.clientId !== id)
		}));
	},
	addPurchase: ({ clientId, product, amount, date, installments }) => {
		const seq = get().purchaseSeq + 1;
		const id = nid("buy");
		const purchase = {
			id,
			clientId,
			product: product.trim(),
			amount,
			date,
			installments,
			receiptNumber: receiptCode("C", seq),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set((s) => ({
			purchases: [purchase, ...s.purchases],
			purchaseSeq: seq
		}));
		return id;
	},
	deletePurchase: (id) => {
		set((s) => ({
			purchases: s.purchases.filter((p) => p.id !== id),
			payments: s.payments.filter((p) => p.purchaseId !== id)
		}));
	},
	addPayment: ({ clientId, purchaseId, amount, date }) => {
		const seq = get().paymentSeq + 1;
		const id = nid("pay");
		const payment = {
			id,
			clientId,
			purchaseId,
			amount,
			date,
			receiptNumber: receiptCode("P", seq),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set((s) => ({
			payments: [payment, ...s.payments],
			paymentSeq: seq
		}));
		return id;
	},
	deletePayment: (id) => {
		set((s) => ({ payments: s.payments.filter((p) => p.id !== id) }));
	},
	updateSettings: (patch) => {
		set((s) => ({ settings: {
			...s.settings,
			...patch
		} }));
	},
	clearAll: () => {
		set({
			clients: [],
			purchases: [],
			payments: [],
			settings: emptySettings,
			purchaseSeq: 0,
			paymentSeq: 0,
			onboarded: true
		});
	},
	loadDemo: () => {
		set({
			...demoData(),
			onboarded: true
		});
	}
}), {
	name: "caderneta-ledger-v1",
	skipHydration: true,
	partialize: (s) => ({
		onboarded: s.onboarded,
		clients: s.clients,
		purchases: s.purchases,
		payments: s.payments,
		settings: s.settings,
		purchaseSeq: s.purchaseSeq,
		paymentSeq: s.paymentSeq
	})
}));
function useHydrated() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		let finished = false;
		const finish = () => {
			if (cancelled || finished) return;
			finished = true;
			const s = useLedger.getState();
			if (!s.onboarded) s.loadDemo();
			useLedger.setState({ hydrated: true });
			setReady(true);
		};
		const unsub = useLedger.persist.onFinishHydration(finish);
		useLedger.persist.rehydrate().then(finish, finish);
		const timeout = window.setTimeout(finish, 500);
		return () => {
			cancelled = true;
			unsub();
			window.clearTimeout(timeout);
		};
	}, []);
	return ready;
}
//#endregion
export { formatDate as a, parseBRL as c, summarizeShop as d, todayISO as f, formatBRL as i, summarizeClient as l, useLedger as m, Button as n, formatDateLong as o, useHydrated as p, cn as r, openPurchases as s, BrandMark as t, summarizePurchase as u };
