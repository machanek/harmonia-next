// components/Filters.tsx
import React from "react";
import type { Filters } from "@/lib/filterSort";
import {
  FiltersForm,
  FiltersGrid,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  FilterInput,
  FilterActions,
} from "@/components/ui/UnitsSection";
import { Button } from "@/components/ui/Button";

type Props = {
  value: Filters;
  buildings: string[];
  onChange: (f: Filters) => void;
  onReset: () => void;
};

export default function Filters({ value, buildings, onChange, onReset }: Props) {
  return (
    <FiltersForm id="filters" aria-label="Filtry oferty" onSubmit={(e)=>e.preventDefault()}>
      <FiltersGrid>
        <FilterGroup>
          <FilterLabel htmlFor="filter-status">Status</FilterLabel>
          <FilterSelect
            id="filter-status"
            value={value.status ?? ""}
            onChange={(e) => onChange({ ...value, status: e.target.value as typeof value.status })}
          >
            <option value="">Wszystkie</option>
            <option value="wolny">Wolne</option>
            <option value="zarezerwowany">Zarezerwowane</option>
            <option value="sprzedany">Sprzedane</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="filter-budynek">Budynek</FilterLabel>
          <FilterSelect
            id="filter-budynek"
            value={value.building ?? ""}
            onChange={(e) => onChange({ ...value, building: e.target.value })}
          >
            <option value="">Wszystkie</option>
            {buildings.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="filter-min">Pow. min (m²)</FilterLabel>
          <FilterInput
            id="filter-min"
            type="number"
            min={0}
            value={value.areaMin ?? ""}
            onChange={(e) => onChange({ ...value, areaMin: e.target.value ? Number(e.target.value) : null })}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="filter-max">Pow. max (m²)</FilterLabel>
          <FilterInput
            id="filter-max"
            type="number"
            min={0}
            value={value.areaMax ?? ""}
            onChange={(e) => onChange({ ...value, areaMax: e.target.value ? Number(e.target.value) : null })}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="filter-sort">Sortowanie</FilterLabel>
          <FilterSelect
            id="filter-sort"
            value={value.sort ?? ""}
            onChange={(e) => onChange({ ...value, sort: e.target.value as typeof value.sort })}
          >
            <option value="">Domyślne</option>
            <option value="cena_asc">Cena rosnąco</option>
            <option value="cena_desc">Cena malejąco</option>
            <option value="pow_asc">Powierzchnia rosnąco</option>
            <option value="pow_desc">Powierzchnia malejąco</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersGrid>

      <FilterActions>
        <Button type="button" variant="primary" size="sm" onClick={() => onChange({ ...value })}>
          Filtruj
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={onReset}>
          Wyczyść
        </Button>
      </FilterActions>
    </FiltersForm>
  );
}
