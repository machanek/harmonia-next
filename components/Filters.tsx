// components/Filters.tsx
import React from "react";
import type { Filters } from "@/lib/filterSort";

type Props = {
  value: Filters;
  buildings: string[];
  onChange: (f: Filters) => void;
  onReset: () => void;
};

export default function Filters({ value, buildings, onChange, onReset }: Props) {
  return (
    <form id="filters" className="filters" aria-label="Filtry oferty" onSubmit={(e)=>e.preventDefault()}>
      <div className="filters-row">
        <div className="filter">
          <label htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            value={value.status ?? ""}
            onChange={(e) => onChange({ ...value, status: e.target.value as typeof value.status })}
          >
            <option value="">Wszystkie</option>
            <option value="wolny">Wolne</option>
            <option value="zarezerwowany">Zarezerwowane</option>
            <option value="sprzedany">Sprzedane</option>
          </select>
        </div>

        <div className="filter">
          <label htmlFor="filter-budynek">Budynek</label>
          <select
            id="filter-budynek"
            value={value.building ?? ""}
            onChange={(e) => onChange({ ...value, building: e.target.value })}
          >
            <option value="">Wszystkie</option>
            {buildings.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="filter-min">Pow. min (m²)</label>
          <input
            id="filter-min"
            type="number"
            min={0}
            value={value.areaMin ?? ""}
            onChange={(e) => onChange({ ...value, areaMin: e.target.value ? Number(e.target.value) : null })}
          />
        </div>

        <div className="filter">
          <label htmlFor="filter-max">Pow. max (m²)</label>
          <input
            id="filter-max"
            type="number"
            min={0}
            value={value.areaMax ?? ""}
            onChange={(e) => onChange({ ...value, areaMax: e.target.value ? Number(e.target.value) : null })}
          />
        </div>

        <div className="filter">
          <label htmlFor="filter-sort">Sortowanie</label>
          <select
            id="filter-sort"
            value={value.sort ?? ""}
            onChange={(e) => onChange({ ...value, sort: e.target.value as typeof value.sort })}
          >
            <option value="">Domyślne</option>
            <option value="cena_asc">Cena rosnąco</option>
            <option value="cena_desc">Cena malejąco</option>
            <option value="pow_asc">Powierzchnia rosnąco</option>
            <option value="pow_desc">Powierzchnia malejąco</option>
          </select>
        </div>

        <div className="filter actions">
          <button type="button" id="filter-apply" className="btn btn-primary" onClick={() => onChange({ ...value })}>
            Filtruj
          </button>
          <button type="reset" id="filter-reset" className="btn btn-secondary" onClick={onReset}>
            Wyczyść
          </button>
        </div>
      </div>
    </form>
  );
}
