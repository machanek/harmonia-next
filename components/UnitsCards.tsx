// components/UnitsCards.tsx
import React from "react";
import type { Unit } from "@/lib/loadUnits";
import { formatM2, formatPLN } from "@/lib/format";
import {
  CardsContainer,
  UnitCard,
  CardHeader,
  CardId,
  CardInfo,
  CardField,
  FieldLabel,
  FieldValue,
  CardDetails,
  CardActions,
  PlanLink,
  MutedText,
  StatusBadge,
} from "@/components/ui/UnitsSection";

type Props = { items: Unit[] };

export default function UnitsCards({ items }: Props) {
  return (
    <CardsContainer id="unitsCards" aria-live="polite">
      {items.map((u) => (
        <UnitCard key={u.id} sold={u.status?.toLowerCase().startsWith("sprzed") || false}>
          <CardHeader>
            <CardId>{u.building ?? "—"} {u.unit ?? ""}</CardId>
            <StatusBadgeComponent status={u.status} />
          </CardHeader>
          <CardInfo>
            <CardField>
              <FieldLabel>Piętro:</FieldLabel>
              <FieldValue>{u.floor ?? "—"}</FieldValue>
            </CardField>
            <CardField>
              <FieldLabel>Powierzchnia:</FieldLabel>
              <FieldValue>{formatM2(u.area)}</FieldValue>
            </CardField>
            <CardField>
              <FieldLabel>Dodatki:</FieldLabel>
              <FieldValue>{u.extras?.join(", ") ?? "—"}</FieldValue>
            </CardField>
            <CardField>
              <FieldLabel>Cena:</FieldLabel>
              <FieldValue>{formatPLN(u.price)}</FieldValue>
            </CardField>
            <CardField>
              <FieldLabel>Cena/m²:</FieldLabel>
              <FieldValue>
                {u.pricePerM2 ? formatPLN(u.pricePerM2) : (u.price && u.area ? formatPLN(Math.round(u.price/u.area)) : "—")}
              </FieldValue>
            </CardField>
            <CardField>
              <FieldLabel>Status:</FieldLabel>
              <FieldValue><StatusBadgeComponent status={u.status} /></FieldValue>
            </CardField>
          </CardInfo>
          {u.extras && u.extras.length > 0 && (
            <CardDetails>
              <p><strong>Dodatki:</strong> {u.extras.join(", ")}</p>
            </CardDetails>
          )}
          <CardActions>
            {u.planUrl ? (
              <PlanLink href={u.planUrl} target="_blank" rel="noopener noreferrer">
                Zobacz plan
              </PlanLink>
            ) : (
              <MutedText>Brak planu</MutedText>
            )}
          </CardActions>
        </UnitCard>
      ))}
    </CardsContainer>
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
