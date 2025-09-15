// lib/filterSort.ts
import type { Unit } from "./loadUnits";

export type Filters = {
  status?: "" | "wolny" | "zarezerwowany" | "sprzedany";
  building?: string | "";
  areaMin?: number | null;
  areaMax?: number | null;
  sort?: "" | "cena_asc" | "cena_desc" | "pow_asc" | "pow_desc";
};

export function applyFilters(units: Unit[], f: Filters): Unit[] {
  let out = units;

  if (f.status) out = out.filter(u => (u.status ?? "").toLowerCase() === f.status);
  if (f.building) out = out.filter(u => (u.building ?? "") === f.building);
  if (f.areaMin != null) out = out.filter(u => (u.area ?? Infinity) >= (f.areaMin as number));
  if (f.areaMax != null) out = out.filter(u => (u.area ?? -Infinity) <= (f.areaMax as number));

  switch (f.sort) {
    case "cena_asc":
      out = [...out].sort((a,b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      break;
    case "cena_desc":
      out = [...out].sort((a,b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
      break;
    case "pow_asc":
      out = [...out].sort((a,b) => (a.area ?? Infinity) - (b.area ?? Infinity));
      break;
    case "pow_desc":
      out = [...out].sort((a,b) => (b.area ?? -Infinity) - (a.area ?? -Infinity));
      break;
    default:
      break;
  }
  return out;
}
