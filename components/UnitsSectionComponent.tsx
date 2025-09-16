import React from 'react';
import type { Unit } from '@/lib/loadUnits';
import type { Filters } from '@/lib/filterSort';
import FiltersForm from '@/components/Filters';
import UnitsTable from '@/components/UnitsTable';
import UnitsCards from '@/components/UnitsCards';
import {
  UnitsSection,
  SectionContainer,
  SectionTitle,
  ViewControls,
  ViewSwitch,
  ViewButton,
  ResultsInfo,
  ResultsCount,
  StatusLegend,
  LegendItem,
  LegendBadge,
  LegendLabel,
} from '@/components/ui/UnitsSection';

interface UnitsSectionComponentProps {
  filters: Filters;
  buildings: string[];
  filtered: Unit[];
  view: 'table' | 'cards';
  setFilters: (filters: Filters) => void;
  setView: (view: 'table' | 'cards') => void;
}

function UnitsSectionComponent({
  filters,
  buildings,
  filtered,
  view,
  setFilters,
  setView,
}: UnitsSectionComponentProps) {
  return (
    <UnitsSection id="lokale">
      <SectionContainer>
        <SectionTitle>Dostępność lokali</SectionTitle>

        <FiltersForm
          value={filters}
          buildings={buildings}
          onChange={setFilters}
          onReset={() => setFilters({ status: "", building: "", areaMin: null, areaMax: null, sort: "" })}
        />

        <ViewControls>
          <ViewSwitch>
            <ViewButton 
              active={view === "table"} 
              onClick={() => setView("table")}
            >
              Tabela
            </ViewButton>
            <ViewButton 
              active={view === "cards"} 
              onClick={() => setView("cards")}
            >
              Karty
            </ViewButton>
          </ViewSwitch>
          <ResultsInfo>
            <ResultsCount>Łącznie: <strong>{filtered.length}</strong></ResultsCount>
          </ResultsInfo>
        </ViewControls>

        {view === "table" ? <UnitsTable items={filtered} /> : <UnitsCards items={filtered} />}

        <StatusLegend>
          <LegendItem>
            <LegendBadge status="free" />
            <LegendLabel>WOLNE</LegendLabel>
          </LegendItem>
          <LegendItem>
            <LegendBadge status="reserved" />
            <LegendLabel>ZAREZERWOWANE</LegendLabel>
          </LegendItem>
          <LegendItem>
            <LegendBadge status="sold" />
            <LegendLabel>SPRZEDANE</LegendLabel>
          </LegendItem>
        </StatusLegend>
      </SectionContainer>
    </UnitsSection>
  );
}

export default UnitsSectionComponent;
