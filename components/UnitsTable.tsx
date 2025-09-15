// components/UnitsTable.tsx
import React from "react";
import type { Unit } from "@/lib/loadUnits";
import { formatM2, formatPLN } from "@/lib/format";

type Props = { items: Unit[] };

export default function UnitsTable({ items }: Props) {
  return (
    <div className="units-table-wrap">
      <table id="unitsTable" className="units-table" aria-label="Tabela jednostek">
        <thead>
          <tr>
            <th>ID</th>
            <th>Budynek</th>
            <th>Lokal</th>
            <th>Piętro</th>
            <th>Pow. (m²)</th>
            <th>Dodatki</th>
            <th>Cena (PLN)</th>
            <th>Cena/m²</th>
            <th>Status</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          {items.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.building ?? "—"}</td>
              <td>{u.unit ?? "—"}</td>
              <td>{u.floor ?? "—"}</td>
              <td>{formatM2(u.area)}</td>
              <td>{u.extras?.join(", ") ?? "—"}</td>
              <td>{formatPLN(u.price)}</td>
              <td>{u.pricePerM2 ? formatPLN(u.pricePerM2) : (u.price && u.area ? formatPLN(Math.round(u.price/u.area)) : "—")}</td>
              <td><StatusBadge status={u.status} /></td>
              <td>{u.planUrl ? <a href={u.planUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm">Zobacz</a> : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
