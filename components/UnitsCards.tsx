// components/UnitsCards.tsx
import React from "react";
import type { Unit } from "@/lib/loadUnits";
import { formatM2, formatPLN } from "@/lib/format";

type Props = { items: Unit[] };

export default function UnitsCards({ items }: Props) {
  return (
    <div id="unitsCards" className="units-cards-grid" aria-live="polite">
      {items.map((u) => (
        <article key={u.id} className="unit-card">
          <header className="unit-card__header">
            <h3>{u.building ?? "—"} {u.unit ?? ""}</h3>
            <StatusBadge status={u.status} />
          </header>
          <ul className="unit-card__meta">
            <li><strong>Piętro:</strong> {u.floor ?? "—"}</li>
            <li><strong>Powierzchnia:</strong> {formatM2(u.area)}</li>
            <li><strong>Dodatki:</strong> {u.extras?.join(", ") ?? "—"}</li>
          </ul>
          <div className="unit-card__price">
            <div>{formatPLN(u.price)}</div>
            <div className="muted">
              {u.pricePerM2 ? formatPLN(u.pricePerM2) : (u.price && u.area ? formatPLN(Math.round(u.price/u.area)) : "—")} / m²
            </div>
          </div>
          <footer className="unit-card__footer">
            {u.planUrl ? <a href={u.planUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm">Plan</a> : <span className="muted">Brak planu</span>}
          </footer>
        </article>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status?: string | null }) {
  const s = (status ?? "").toLowerCase();
  const cls =
    s === "wolny" ? "badge badge-free" :
    s.startsWith("zarezer") ? "badge badge-reserved" :
    s.startsWith("sprzed") ? "badge badge-sold" :
    "badge";
  const label =
    s === "wolny" ? "WOLNE" :
    s.startsWith("zarezer") ? "ZAREZERWOWANE" :
    s.startsWith("sprzed") ? "SPRZEDANE" : (status ?? "—");
  return <span className={cls}>{label}</span>;
}
