// components/ArchitectureSection.tsx
import React from "react";
import {
  ArchitectureSection as StyledArchitectureSection,
  ArchitectureContainer,
  ArchitectureGrid,
  ArchitectureContent,
  ArchitectureTitle,
  ArchitectureText,
  MetricsCard,
  MetricsTitle,
  MetricsList,
  MetricPill,
  MetricCode,
  MetricValue,
} from "@/components/ui/ArchitectureSection";

export default function ArchitectureSection() {
  // jeśli chcesz dynamicznie – podmienimy później; na razie 1:1 ze starej
  const metrics = [80, 107, 122, 95, 110];

  return (
    <StyledArchitectureSection id="architektura">
      <ArchitectureContainer>
        <ArchitectureGrid>
          <ArchitectureContent>
            <ArchitectureTitle>Architektura i bezpieczeństwo</ArchitectureTitle>

            <ArchitectureText>
              Budynki zostały zaprojektowane w nowoczesnym stylu z wykorzystaniem wysokiej jakości
              materiałów. Elewacje łączą tynki mineralnych odcieni z elementami drewnianymi i szklanymi,
              tworząc harmonijną kompozycję z otaczającą zielenią.
            </ArchitectureText>

            <ArchitectureText>
              Osiedle wyposażone jest w system monitoringu, kontrolę dostępu oraz oświetlenie LED całego
              terenu. Przestronne place zabaw dla dzieci, miejsca rekreacji oraz zieleń krajobrazowa
              tworzą przyjazne środowisko dla całych rodzin.
            </ArchitectureText>

            <ArchitectureText>
              Każdy budynek posiada windę, komórki lokatorskie oraz miejsca parkingowe w garażach
              podziemnych. Wysokiej klasy izolacja termiczna i akustyczna gwarantuje komfort użytkowania
              przez cały rok.
            </ArchitectureText>
          </ArchitectureContent>

          <MetricsCard aria-labelledby="metricsTitle">
            <MetricsTitle id="metricsTitle">Dostępne metraże</MetricsTitle>
            <MetricsList>
              {metrics.map((m) => (
                <MetricPill key={m}>
                  <MetricCode>M {m}</MetricCode>
                  <MetricValue>{m} m²</MetricValue>
                </MetricPill>
              ))}
            </MetricsList>
          </MetricsCard>
        </ArchitectureGrid>
      </ArchitectureContainer>
    </StyledArchitectureSection>
  );
}
