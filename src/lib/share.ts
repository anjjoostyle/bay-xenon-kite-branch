export function appUrl(path: string): string {
  if (typeof window === "undefined") return path;
  const origin = window.location.origin.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

export async function copyText(text: string, input?: HTMLInputElement | null) {
  if (input) {
    input.focus();
    input.select();
    input.setSelectionRange(0, text.length);
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    }
  }
}

export function whatsappHref(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
