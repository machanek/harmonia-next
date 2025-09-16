// components/ArchitectureSection.tsx
import React from "react";

export default function ArchitectureSection() {
  // jeśli chcesz dynamicznie – podmienimy później; na razie 1:1 ze starej
  const metrics = [80, 107, 122, 95, 110];

  return (
    <section className="section-architecture" id="architektura">
      <div className="container arch-grid">
        <div className="arch-copy">
          <h2>Architektura i bezpieczeństwo</h2>

          <p>
            Budynki zostały zaprojektowane w nowoczesnym stylu z wykorzystaniem wysokiej jakości
            materiałów. Elewacje łączą tynki mineralnych odcieni z elementami drewnianymi i szklanymi,
            tworząc harmonijną kompozycję z otaczającą zielenią.
          </p>

          <p>
            Osiedle wyposażone jest w system monitoringu, kontrolę dostępu oraz oświetlenie LED całego
            terenu. Przestronne place zabaw dla dzieci, miejsca rekreacji oraz zieleń krajobrazowa
            tworzą przyjazne środowisko dla całych rodzin.
          </p>

          <p>
            Każdy budynek posiada windę, komórki lokatorskie oraz miejsca parkingowe w garażach
            podziemnych. Wysokiej klasy izolacja termiczna i akustyczna gwarantuje komfort użytkowania
            przez cały rok.
          </p>
        </div>

        <aside className="metrics-card" aria-labelledby="metricsTitle">
          <h3 id="metricsTitle">Dostępne metraże</h3>
          <ul className="metrics-list">
            {metrics.map((m) => (
              <li key={m} className="metric-pill">
                <span className="code">M {m}</span>
                <span className="value">{m} m²</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
