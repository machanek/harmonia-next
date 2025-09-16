/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadUnitsAll, listBuildings, type Unit } from "@/lib/loadUnits";
import { applyFilters, type Filters } from "@/lib/filterSort";
import { loadGallery, type GalleryItem } from "@/lib/loadGallery";
import FiltersForm from "@/components/Filters";
import UnitsTable from "@/components/UnitsTable";
import UnitsCards from "@/components/UnitsCards";
import AboutSection from "@/components/AboutSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import GalleryGrid from "@/components/GalleryGrid";
import ContactForm from "@/components/ContactForm";
import UnitsSectionComponent from "@/components/UnitsSectionComponent";

type Props = {
  units: Unit[];
  buildings: string[];
  gallery: GalleryItem[];
};

export default function Home({ units, buildings, gallery }: Props) {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({ status: "", building: "", areaMin: null, areaMax: null, sort: "" });
  const [view, setView] = useState<"table"|"cards">("table");
  const filtered = useMemo(() => applyFilters(units, filters), [units, filters]);

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // dopilnuj form-name:
    if (!fd.get("form-name")) fd.set("form-name", "contact");

    const params = new URLSearchParams();
    fd.forEach((value, key) => params.append(key, String(value)));

    await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    router.push("/success");
  }

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const probe = (url: string) =>
      fetch(url, { method: "HEAD" }).then(r => ({ url, ok: r.ok })).catch(() => ({ url, ok: false }));
    Promise.all([
      probe("/images/logo.svg"),
      ... (Array.isArray(gallery) ? gallery.slice(0,3) : []).map(g => probe(g.src)),
    ]).then(results => {
      const misses = results.filter(r => !r.ok).map(r => r.url);
      if (misses.length) console.warn("[assets-check] Missing:", misses);
    });
  }, [gallery]);

  return (
    <>
      <Head>
        <title>Harmonia Rząska — Oferta</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main id="top">
        <section className="hero" id="hero">
          <div className="hero-inner">
          <div className="container">
              <div className="hero-gallery">
                <img src="/images/uploads/hero-1.jpg" alt="Harmonia Rząska - widok osiedla" loading="eager" />
                <img src="/images/uploads/hero-2.jpg" alt="Harmonia Rząska - dom" loading="lazy" />
                <img src="/images/uploads/hero-3.jpg" alt="Harmonia Rząska - okolica" loading="lazy" />
              </div>
            <div className="hero-content">
                <h1>Osiedla Harmonia Rząska</h1>
                <p>Odkryj przestrzeń stworzoną dla Ciebie – nowoczesne domy w harmonii z otoczeniem.</p>
              </div>
            </div>
          </div>
        </section>

        <AboutSection />

        <ArchitectureSection />

        <section className="section-plan" id="plan">
          <div className="container">
            <h2>Plan osiedla</h2>
            <div className="plan-image">
              <img src="/images/uploads/plan-osiedla.jpg" alt="Plan zagospodarowania osiedla Harmonia Rząska" />
                </div>
                </div>
        </section>

        <section className="section-metrics" id="metraze">
          <div className="container">
            <h2>Dostępne metraże</h2>
            <div className="metrics-grid">
              <div className="metric">
                <div className="metric-code">M 80</div>
                <div className="metric-value">80 m²</div>
                </div>
              <div className="metric">
                <div className="metric-code">M 107</div>
                <div className="metric-value">107 m²</div>
                </div>
              <div className="metric">
                <div className="metric-code">M 122</div>
                <div className="metric-value">122 m²</div>
                </div>
              <div className="metric">
                <div className="metric-code">M 95</div>
                <div className="metric-value">95 m²</div>
                </div>
              <div className="metric">
                <div className="metric-code">M 110</div>
                <div className="metric-value">110 m²</div>
              </div>
            </div>
          </div>
        </section>

        <UnitsSectionComponent
          filters={filters}
          buildings={buildings}
          filtered={filtered}
          view={view}
          setFilters={setFilters}
          setView={setView}
        />

        <section className="gallery" id="galeria">
          <div className="container">
            <h3>Galeria wnętrz</h3>
            <GalleryGrid items={gallery} />
          </div>
        </section>

        <section className="map-section" id="lokalizacja">
          <div className="container">
            <h3>Lokalizacja</h3>
            <p>Rząska, gm. Zabierzów — szybki dojazd do Krakowa, spokojna okolica.</p>
            <div className="map-container">
              <iframe
                title="Mapa — Harmonia Rząska"
                src="https://www.google.com/maps?q=Rząska&output=embed"
                width="100%" height="400" style={{border:0}} loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section-contact" id="kontakt">
          <div className="container">
            <div className="contact-form-section">
              <h3>Skontaktuj się z nami</h3>
              <p>Masz pytania o dostępne lokale? Chcesz umówić się na prezentację? Napisz do nas!</p>
              <ContactForm onSubmit={handleContactSubmit} />
              </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Harmonia Rząska</h4>
              <p>Nowoczesne osiedle domów i mieszkań pod Krakowem. Idealne miejsce dla rodzin.</p>
            </div>
            <div className="footer-section">
              <h4>Kontakt</h4>
              <p><a href="tel:730090030">730 090 030</a></p>
              <p><a href="mailto:biuro@harmoniarzaska.pl">biuro@harmoniarzaska.pl</a></p>
              <p>Rząska k. Krakowa</p>
            </div>
            <div className="footer-section">
              <h4>Informacje</h4>
              <div className="footer-links">
                <a href="/robots.txt" target="_blank" rel="noopener">Polityka prywatności / RODO</a>
                <a href="#kontakt">Kontakt</a>
                <a href="/assets/prospekt-harmonia-rzaska.pdf" target="_blank" rel="noopener">Katalog PDF</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Harmonia Rząska. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  const units = await loadUnitsAll();
  const buildings = listBuildings(units);
  const gallery = await loadGallery();
  return { props: { units, buildings, gallery }, revalidate: 60 };
}
