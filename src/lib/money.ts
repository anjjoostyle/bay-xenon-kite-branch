export function formatBRL(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

/** Parse Brazilian money text into integer cents. Returns null if invalid. */
export function parseBRL(raw: string): number | null {
  const s = raw.replace(/[R$\s]/gi, "").trim();
  if (!s) return null;

  let n: number;
  if (s.includes(",")) {
    n = Number(s.replace(/\./g, "").replace(",", "."));
  } else if (s.includes(".")) {
    const parts = s.split(".");
    const last = parts[parts.length - 1] ?? "";
    n =
      parts.length === 2 && last.length <= 2
        ? Number(s)
        : Number(s.replace(/\./g, ""));
  } else {
    n = Number(s);
  }

  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export function formatDateLong(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function receiptCode(prefix: "C" | "P", seq: number): string {
  return `${prefix}-${String(seq).padStart(4, "0")}`;
}
