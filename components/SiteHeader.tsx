// components/SiteHeader.tsx
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Menu, Download, Phone } from "lucide-react";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header header">
      <div className="container header-inner">
        <a href="#top" className="logo" aria-label="Harmonia Rząska — strona główna">
          <img src="/assets/logo-harmonia-rzaska.svg" alt="Harmonia Rząska" height={40} />
        </a>

        {/* DESKTOP NAV */}
        <nav className="nav hidden md:flex items-center gap-8">
          <a href="#o-nas">O nas</a>
          <a href="#lokale">Lokale</a>
          <a href="#galeria">Galeria</a>
          <a href="#kontakt">Kontakt</a>
          <a href="/assets/prospekt-harmonia-rzaska.pdf" target="_blank" rel="noopener" className="btn-prospekt">
            <Download size={16} />
            Prospekt
          </a>
          <a href="tel:+48730090030" className="nav-phone">
            <Phone size={16} />
            730 090 030
          </a>
        </nav>

        {/* MOBILE NAV */}
        <nav className="nav md:hidden flex items-center gap-4">
          <a href="/assets/prospekt-harmonia-rzaska.pdf" target="_blank" rel="noopener" className="btn-prospekt">
            <Download size={16} />
            Prospekt
          </a>
          <a href="tel:+48730090030" className="nav-phone">
            <Phone size={16} />
            730 090 030
          </a>
          <button 
            type="button"
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="mobile-menu md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg">
          <div className="container py-4">
            <nav className="flex flex-col gap-4">
              <a href="#o-nas" onClick={() => setIsMenuOpen(false)}>O nas</a>
              <a href="#lokale" onClick={() => setIsMenuOpen(false)}>Lokale</a>
              <a href="#galeria" onClick={() => setIsMenuOpen(false)}>Galeria</a>
              <a href="#kontakt" onClick={() => setIsMenuOpen(false)}>Kontakt</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
