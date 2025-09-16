// components/UnitsCards.tsx
import React from "react";
import type { Unit } from "@/lib/loadUnits";
import { formatM2, formatPLN } from "@/lib/format";

type Props = { items: Unit[] };

export default function UnitsCards({ items }: Props) {
  return (
    <div id="unitsCards" className="units-cards" aria-live="polite">
      {items.map((u) => (
        <article key={u.id} className={`unit-card ${u.status?.toLowerCase().startsWith("sprzed") ? "sold" : ""}`}>
          <header className="unit-card-header">
            <div className="unit-card-id">{u.building ?? "—"} {u.unit ?? ""}</div>
            <StatusBadge status={u.status} />
          </header>
          <div className="unit-card-info">
            <div className="unit-card-field">
              <span className="label">Piętro:</span>
              <span className="value">{u.floor ?? "—"}</span>
            </div>
            <div className="unit-card-field">
              <span className="label">Powierzchnia:</span>
              <span className="value">{formatM2(u.area)}</span>
            </div>
            <div className="unit-card-field">
              <span className="label">Dodatki:</span>
              <span className="value">{u.extras?.join(", ") ?? "—"}</span>
            </div>
            <div className="unit-card-field price">
              <span className="label">Cena:</span>
              <span className="value">{formatPLN(u.price)}</span>
            </div>
            <div className="unit-card-field">
              <span className="label">Cena/m²:</span>
              <span className="value">
                {u.pricePerM2 ? formatPLN(u.pricePerM2) : (u.price && u.area ? formatPLN(Math.round(u.price/u.area)) : "—")}
              </span>
            </div>
            <div className="unit-card-field status">
              <span className="label">Status:</span>
              <span className="value"><StatusBadge status={u.status} /></span>
            </div>
          </div>
          {u.extras && u.extras.length > 0 && (
            <div className="unit-card-details">
              <p><strong>Dodatki:</strong> {u.extras.join(", ")}</p>
            </div>
          )}
          <div className="unit-card-actions">
            {u.planUrl ? <a href={u.planUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm">Zobacz plan</a> : <span className="muted">Brak planu</span>}
          </div>
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
