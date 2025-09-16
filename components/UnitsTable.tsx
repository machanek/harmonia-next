// components/UnitsTable.tsx
import React from "react";
import type { Unit } from "@/lib/loadUnits";
import { formatM2, formatPLN } from "@/lib/format";
import {
  TableContainer,
  UnitsTable as StyledUnitsTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  StatusBadge,
  PlanLink,
} from "@/components/ui/UnitsSection";

type Props = { items: Unit[] };

export default function UnitsTable({ items }: Props) {
  return (
    <TableContainer>
      <StyledUnitsTable id="unitsTable" aria-label="Tabela jednostek">
        <TableHeader>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Budynek</TableHeaderCell>
            <TableHeaderCell>Lokal</TableHeaderCell>
            <TableHeaderCell>Piętro</TableHeaderCell>
            <TableHeaderCell>Pow. (m²)</TableHeaderCell>
            <TableHeaderCell>Dodatki</TableHeaderCell>
            <TableHeaderCell>Cena (PLN)</TableHeaderCell>
            <TableHeaderCell>Cena/m²</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Plan</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {items.map((u) => (
            <TableRow key={u.id} sold={u.status?.toLowerCase().startsWith("sprzed") || false}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.building ?? "—"}</TableCell>
              <TableCell>{u.unit ?? "—"}</TableCell>
              <TableCell>{u.floor ?? "—"}</TableCell>
              <TableCell>{formatM2(u.area)}</TableCell>
              <TableCell>{u.extras?.join(", ") ?? "—"}</TableCell>
              <TableCell>{formatPLN(u.price)}</TableCell>
              <TableCell>{u.pricePerM2 ? formatPLN(u.pricePerM2) : (u.price && u.area ? formatPLN(Math.round(u.price/u.area)) : "—")}</TableCell>
              <TableCell><StatusBadgeComponent status={u.status} /></TableCell>
              <TableCell>{u.planUrl ? <PlanLink href={u.planUrl} target="_blank" rel="noopener noreferrer">Zobacz</PlanLink> : "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledUnitsTable>
    </TableContainer>
  );
}

function StatusBadgeComponent({ status }: { status?: string | null }) {
  const s = (status ?? "").toLowerCase();
  const statusType =
    s === "wolny" ? "free" :
    s.startsWith("zarezer") ? "reserved" :
    s.startsWith("sprzed") ? "sold" :
    "free";
  const label =
    s === "wolny" ? "WOLNE" :
    s.startsWith("zarezer") ? "ZAREZERWOWANE" :
    s.startsWith("sprzed") ? "SPRZEDANE" : (status ?? "—");
  return <StatusBadge status={statusType}>{label}</StatusBadge>;
}
