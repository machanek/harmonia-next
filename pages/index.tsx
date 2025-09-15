/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useMemo, useState, useEffect } from "react";
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
  const [filters, setFilters] = useState<Filters>({ status: "", building: "", areaMin: null, areaMax: null, sort: "" });
  const [view, setView] = useState<"table"|"cards">("table");
  const filtered = useMemo(() => applyFilters(units, filters), [units, filters]);

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
          <nav className="main-nav" aria-label="Główna nawigacja">
            <ul>
              <li><a href="#oferta">Oferta</a></li>
              <li><a href="#galeria">Galeria</a></li>
              <li><a href="#lokalizacja">Lokalizacja</a></li>
              <li><a href="#kontakt">Kontakt</a></li>
              <li><a href="/admin" target="_blank" rel="noopener noreferrer">Panel</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="section-offer" id="oferta">
          <div className="container">
            <h1>Oferta mieszkań i domów</h1>

            <FiltersForm
              value={filters}
              buildings={buildings}
              onChange={setFilters}
              onReset={() => setFilters({ status: "", building: "", areaMin: null, areaMax: null, sort: "" })}
            />

            <div className="view-switch" style={{display:"flex", gap:"8px", margin:"12px 0"}}>
              <button className={`btn ${view==="table"?"btn-primary":""}`} onClick={()=>setView("table")}>Tabela</button>
              <button className={`btn ${view==="cards"?"btn-primary":""}`} onClick={()=>setView("cards")}>Karty</button>
              <div style={{marginLeft:"auto"}}>Łącznie: <strong>{filtered.length}</strong></div>
            </div>

            {view === "table" ? <UnitsTable items={filtered} /> : <UnitsCards items={filtered} />}

            <div className="legend" style={{marginTop:"12px"}}>
              <span className="badge badge-free">WOLNE</span>{" "}
              <span className="badge badge-reserved">ZAREZERWOWANE</span>{" "}
              <span className="badge badge-sold">SPRZEDANE</span>
            </div>
          </div>
        </section>

        <section className="section-gallery" id="galeria">
          <div className="container">
            <h2>Galeria</h2>
            <GalleryGrid items={gallery} />
          </div>
        </section>

        <section className="section-location" id="lokalizacja">
          <div className="container">
            <h2>Lokalizacja</h2>
            <p>Rząska, gm. Zabierzów — szybki dojazd do Krakowa, spokojna okolica.</p>
            <div className="map-container" role="application" aria-label="Mapa lokalizacji">
              <iframe
                title="Mapa — Harmonia Rząska"
                src="https://www.google.com/maps?q=Rząska&output=embed"
                width="100%"
                height="420"
                style={{border:0}}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="section-contact" id="kontakt">
          <div className="container">
            <h2>Kontakt</h2>
            <form
              id="contactForm"
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/success"
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
          <p>&copy; {new Date().getFullYear()} Harmonia Rząska</p>
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
