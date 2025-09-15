/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/loadUnits.ts
import fs from "fs/promises";
import path from "path";

export type Unit = {
  id: string;
  building?: string | null;
  unit?: string | null;      // numer lokalu
  floor?: number | null;
  area?: number | null;      // m²
  extras?: string[] | null;
  price?: number | null;     // PLN
  pricePerM2?: number | null;
  status?: string | null;    // wolny | zarezerwowany | sprzedany
  planUrl?: string | null;
  raw?: any;                 // oryginalny obiekt JSON (debug)
};

function num(v: any): number | null {
  if (v === null || v === undefined || v === "") return null;
  const s = String(v).replace(/[^0-9.,-]/g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function pick<T = any>(obj: any, keys: string[]): T | null {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "") {
      return obj[k];
    }
  }
  return null;
}

function normStatus(s: any): string | null {
  if (!s) return null;
  const x = String(s).toLowerCase();
  if (x.startsWith("wol")) return "wolny";
  if (x.startsWith("zar") || x.includes("rez")) return "zarezerwowany";
  if (x.startsWith("sprz") || x.includes("sold")) return "sprzedany";
  return s;
}

function toArray(v: any): string[] | null {
  if (!v) return null;
  if (Array.isArray(v)) return v.map(String);
  return String(v).split(/[;,|]/).map(x => x.trim()).filter(Boolean);
}

function normalize(obj: any): Unit {
  const id =
    String(pick(obj, ["id","ID","uid","slug","name","lokal","unit","numer"]) ?? cryptoRandomId());

  // Dodatkowe aliasy PL:
  const building = pick<string>(obj, [
    "building","budynek","blok","block","bud","nr_budynku"
  ]);
  const unit = pick<string>(obj, [
    "unit","lokal","mieszkanie","numer","name","id","nr_lokalu"
  ]);
  const floorRaw = pick<any>(obj, ["floor","pietro","piętro","level"]);
  const area = num(pick<any>(obj, [
    "area","pow","powierzchnia","m2","sqm","area_m2","pow_m2","powierzchnia_m2"
  ]));
  const price = num(pick<any>(obj, ["price","cena","price_pln","cenaPLN"]));
  let pricePerM2 = num(pick<any>(obj, ["pricePerM2","cena_m2","cenaZaM2","price_per_m2"]));
  const status = normStatus(pick<any>(obj, ["status","state","availability","dostepnosc","dostępność"]));
  const planUrl = pick<string>(obj, ["plan","planUrl","plan_url","rzut","rzutUrl","imagePlan","planImage"]);
  const extras = toArray(pick<any>(obj, ["extras","dodatki","features","tagi","tags"]));
  const floor = floorRaw == null ? null : num(floorRaw) ?? null;

  // policz cena/m2, jeśli brak
  if ((pricePerM2 == null || Number.isNaN(pricePerM2)) && price != null && area) {
    pricePerM2 = Math.round(price / area);
  }

  return { id, building, unit, floor, area, price, pricePerM2, status, planUrl, extras, raw: obj };
}

function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 10);
}

async function readJsonFiles(dirAbs: string): Promise<any[]> {
  const entries = await fs.readdir(dirAbs).catch(() => []);
  const files = entries.filter(f => f.toLowerCase().endsWith(".json"));
  const out: any[] = [];
  for (const f of files) {
    try {
      const raw = await fs.readFile(path.join(dirAbs, f), "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) out.push(...parsed);
      else out.push(parsed);
    } catch {
      // pomijamy uszkodzone pliki
    }
  }
  return out;
}

export async function loadUnitsAll(): Promise<Unit[]> {
  const root = process.cwd();
  const candidates = [
    path.join(root, "data", "units"),          // preferowane
    path.join(root, "public", "data", "units") // fallback
  ];

  let payload: any[] = [];
  for (const dir of candidates) {
    const arr = await readJsonFiles(dir);
    if (arr.length) { payload = arr; break; }
  }

  return payload.map(normalize);
}

export function listBuildings(units: Unit[]): string[] {
  const set = new Set<string>();
  for (const u of units) if (u.building) set.add(String(u.building));
  return Array.from(set).sort((a,b)=>a.localeCompare(b,"pl"));
}
