// components/SiteHeader.tsx
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Menu, Download, Phone } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="site-header header">
      <div className="container header-inner">
        <a href="#top" className="logo" aria-label="Harmonia Rząska — strona główna">
          <img src="/assets/logo-harmonia-rzaska.svg" alt="Harmonia Rząska" height={40} />
        </a>

        {/* SSR: przycisk jest w HTML już na serwerze (hydration-safe) */}
        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          aria-controls="main-nav"
          aria-expanded="false"
        >
          <Menu size={20} />
        </button>

        <nav id="main-nav" className="main-nav" aria-label="Główna nawigacja" role="navigation">
          <ul>
            <li><a href="#o-nas">O nas</a></li>
            <li><a href="#lokale">Lokale</a></li>
            <li><a href="#galeria">Galeria</a></li>
            <li><a href="#kontakt">Kontakt</a></li>
            <li>
              <a href="/assets/prospekt-harmonia-rzaska.pdf" target="_blank" rel="noopener" className="btn-prospekt">
                <Download size={16} />
                Prospekt
              </a>
            </li>
            <li>
              <a href="tel:+48730090030" className="btn-phone">
                <Phone size={16} />
                730 090 030
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
