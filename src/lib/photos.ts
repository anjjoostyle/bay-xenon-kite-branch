import type { BrandId } from "./brands";

const BOTTLE: Record<BrandId, { fill: string; label: string }> = {
  natura: { fill: "#1e4d3a", label: "#f4f1ea" },
  avon: { fill: "#5e574c", label: "#f4f1ea" },
  boticario: { fill: "#1c1814", label: "#f4f1ea" },
  eudora: { fill: "#8f2d2d", label: "#faf7f1" },
};

export function shortCode(length = 5): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export function demoPhoto(name: string, brand: BrandId, angle = 0): string {
  const tone = BOTTLE[brand];
  const tilt = angle ? "rotate(-8 240 240)" : "";
  const label = escapeXml(name.slice(0, 14));
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">',
    '<rect width="480" height="480" fill="#f3efe6"/>',
    `<g transform="${tilt}">`,
    `<rect x="188" y="58" width="104" height="36" rx="10" fill="${tone.fill}"/>`,
    `<rect x="168" y="92" width="144" height="300" rx="32" fill="${tone.fill}"/>`,
    `<rect x="184" y="150" width="112" height="150" rx="8" fill="${tone.label}"/>`,
    `<text x="240" y="220" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="${tone.fill}">${label}</text>`,
    "</g></svg>",
  ].join("");
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&" + "amp;")
    .replaceAll("<", "&" + "lt;")
    .replaceAll(">", "&" + "gt;")
    .replaceAll('"', "&" + "quot;");
}

export async function compressPhoto(file: File): Promise<string> {
  const img = await loadImage(file);
  const max = 720;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(img, 0, 0, width, height);
  let quality = 0.72;
  let out = canvas.toDataURL("image/jpeg", quality);
  while (out.length > 160000 && quality > 0.42) {
    quality -= 0.1;
    out = canvas.toDataURL("image/jpeg", quality);
  }
  return out;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não foi possível ler a foto."));
    };
    image.src = url;
  });
}
