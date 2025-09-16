// components/SiteHeader.tsx
/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function SiteHeader() {
  return (
    <header className="site-header header">
      <div className="container header-inner">
        <a href="#top" className="logo" aria-label="Harmonia Rząska — strona główna">
          <img src="/images/logo.svg" alt="Harmonia Rząska" width={180} height={48} />
        </a>

        {/* SSR: przycisk jest w HTML już na serwerze (hydration-safe) */}
        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          aria-controls="main-nav"
          aria-expanded="false"
        >
          ☰
        </button>

        <nav id="main-nav" className="main-nav" aria-label="Główna nawigacja" role="navigation">
          <ul>
            <li><a href="#o-nas">O nas</a></li>
            <li><a href="#lokale">Lokale</a></li>
            <li><a href="#galeria">Galeria</a></li>
            <li><a href="#lokalizacja">Lokalizacja</a></li>
            <li><a href="#kontakt">Kontakt</a></li>
            <li><a href="/assets/prospekt-harmonia-rzaska.pdf" target="_blank" rel="noopener">Prospekt</a></li>
            <li><a href="tel:730090030">730 090 030</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
