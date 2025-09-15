// lib/format.ts
export function formatPLN(n: number | null | undefined): string {
  if (n == null) return "—";
  return n.toLocaleString("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 });
}
export function formatM2(n: number | null | undefined): string {
  if (n == null) return "—";
  return `${n.toLocaleString("pl-PL", { maximumFractionDigits: 2 })} m²`;
}
