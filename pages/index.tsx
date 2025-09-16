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
import GalleryGrid from "@/components/GalleryGrid";

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

      <header className="site-header header">
        <div className="container header-inner">
          <a href="#top" className="logo" aria-label="Harmonia Rząska — strona główna">
            <img src="/images/logo.svg" alt="Harmonia Rząska" width={180} height={48} />
          </a>

          {/* NOWE: renderowany na serwerze przycisk hamburgera */}
          <button
            type="button"
            className="nav-toggle"
            aria-label="Menu"
            aria-controls="main-nav"
            aria-expanded="false"
          >
            ☰
          </button>

          <nav id="main-nav" className="main-nav" aria-label="Główna nawigacja">
            <ul>
              <li><a href="#o-nas">O nas</a></li>
              <li><a href="#lokale">Lokale</a></li>
              <li><a href="#galeria">Galeria</a></li>
              <li><a href="#kontakt">Kontakt</a></li>
              <li><a href="/assets/prospekt-harmonia-rzaska.pdf" target="_blank" rel="noopener">Prospekt</a></li>
              <li><a href="tel:730090030">730 090 030</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-gallery">
                <img src="/images/uploads/hero-1.jpg" alt="Harmonia Rząska - widok osiedla" loading="eager" />
                <img src="/images/uploads/hero-2.jpg" alt="Harmonia Rząska - dom" loading="lazy" />
                <img src="/images/uploads/hero-3.jpg" alt="Harmonia Rząska - okolica" loading="lazy" />
              </div>
              <div className="hero-text">
                <h1>Osiedla Harmonia Rząska</h1>
                <p>Odkryj przestrzeń stworzoną dla Ciebie – nowoczesne domy w harmonii z otoczeniem.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-about" id="o-nas">
          <div className="container">
            <h2>O nas</h2>
            <p>Harmonia Rząska to wyjątkowa inwestycja mieszkaniowa położona w malowniczej miejscowości Rząska, zaledwie kilka kilometrów od granic Krakowa. Łączymy nowoczesną architekturę z poszanowaniem naturalnego otoczenia.</p>
            <p>Oferujemy różnorodne metraże – od kompaktowych po przestronne lokale z balkonami, tarasami lub ogródkami. Wysoki standard, funkcjonalne układy i świetna lokalizacja.</p>
                </div>
        </section>

        <section className="section-plan" id="plan">
          <div className="container">
            <h2>Plan osiedla</h2>
            <img src="/images/uploads/plan-osiedla.jpg" alt="Plan zagospodarowania osiedla Harmonia Rząska" />
                </div>
        </section>

        <section className="section-metrics" id="metraze">
          <div className="container metrics-grid">
            <div className="metric"><div className="metric-code">M 80</div><div className="metric-value">80 m²</div></div>
            <div className="metric"><div className="metric-code">M 107</div><div className="metric-value">107 m²</div></div>
            <div className="metric"><div className="metric-code">M 122</div><div className="metric-value">122 m²</div></div>
            <div className="metric"><div className="metric-code">M 95</div><div className="metric-value">95 m²</div></div>
            <div className="metric"><div className="metric-code">M 110</div><div className="metric-value">110 m²</div></div>
                </div>
        </section>

        <section className="section-offer" id="lokale">
          <div className="container">
            <h2>Dostępność lokali</h2>

            <FiltersForm
              value={filters}
              buildings={buildings}
              onChange={setFilters}
              onReset={() => setFilters({ status: "", building: "", areaMin: null, areaMax: null, sort: "" })}
            />

            <div className="view-switch">
              <button className={`btn ${view==="table"?"btn-primary":""}`} onClick={()=>setView("table")}>Tabela</button>
              <button className={`btn ${view==="cards"?"btn-primary":""}`} onClick={()=>setView("cards")}>Karty</button>
              <span className="results-count">Łącznie: <strong>{filtered.length}</strong></span>
            </div>

            {view === "table" ? <UnitsTable items={filtered} /> : <UnitsCards items={filtered} />}

            <div className="legend">
              <span className="badge badge-free">WOLNE</span>
              <span className="badge badge-reserved">ZAREZERWOWANE</span>
              <span className="badge badge-sold">SPRZEDANE</span>
            </div>
          </div>
        </section>

        <section className="section-gallery" id="galeria">
          <div className="container">
            <h2>Galeria wnętrz</h2>
            <GalleryGrid items={gallery} />
          </div>
        </section>

        <section className="section-location" id="lokalizacja">
          <div className="container">
            <h2>Lokalizacja</h2>
            <p>Rząska, gm. Zabierzów — szybki dojazd do Krakowa, spokojna okolica.</p>
            <div className="map-container">
              <iframe
                title="Mapa — Harmonia Rząska"
                src="https://www.google.com/maps?q=Rząska&output=embed"
                width="100%" height="420" style={{border:0}} loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section-contact" id="kontakt">
          <div className="container">
            <h2>Skontaktuj się z nami</h2>
            <form
              id="contactForm"
              name="contact"
              method="POST"
              onSubmit={handleContactSubmit}
              className="contact-form"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Nie wypełniaj tego pola: <input name="bot-field" /></label>
              </p>

              <div className="form-row">
                <label htmlFor="name">Imię i nazwisko</label>
                <input id="name" name="name" type="text" required placeholder="Jan Kowalski" />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="jan@example.com" />
              </div>

              <div className="form-row">
                <label htmlFor="phone">Telefon</label>
                <input id="phone" name="phone" type="tel" placeholder="+48 600 000 000" />
              </div>

              <div className="form-row">
                <label htmlFor="message">Wiadomość</label>
                <textarea id="message" name="message" rows={5} required placeholder="Treść wiadomości..." />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Wyślij</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-col">
            <h4>Harmonia Rząska</h4>
            <p>Nowoczesne osiedle domów i mieszkań pod Krakowem. Idealne miejsce dla rodzin.</p>
          </div>
          <div className="footer-col">
            <h4>Kontakt</h4>
            <p><a href="tel:730090030">730 090 030</a><br/> <a href="mailto:biuro@harmoniarzaska.pl">biuro@harmoniarzaska.pl</a><br/> Rząska k. Krakowa</p>
          </div>
          <div className="footer-col">
            <h4>Informacje</h4>
            <p>
              <a href="/robots.txt" target="_blank" rel="noopener">Polityka prywatności / RODO</a><br/>
              <a href="#kontakt">Kontakt</a><br/>
              <a href="/assets/prospekt-harmonia-rzaska.pdf" target="_blank" rel="noopener">Katalog PDF</a>
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Harmonia Rząska. Wszystkie prawa zastrzeżone.</p>
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
