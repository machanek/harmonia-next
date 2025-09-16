// components/SiteHeader.tsx
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Menu, Download, Phone } from "lucide-react";
import { styled } from "@/lib/stitches.config";
import { ButtonLink } from "@/components/ui/Button";

// Styled components
const Header = styled('header', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: '$background',
  borderBottom: '1px solid $border',
  zIndex: '$max',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  variants: {
    scrolled: {
      true: {
        boxShadow: '$3',
      },
    },
  },
});

const HeaderInner = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '80px',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 $4',
  
  '@md': {
    padding: '0 $6',
  },
});

const Logo = styled('a', {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  
  '& img': {
    height: '$10',
    width: 'auto',
    transition: 'all 0.3s ease',
  },
  
  '&:hover img': {
    filter: 'brightness(1.1)',
    transform: 'scale(1.02)',
  },
});

const DesktopNav = styled('nav', {
  display: 'none',
  alignItems: 'center',
  gap: '$6',
  
  '@md': {
    display: 'flex',
  },
});

const MobileNav = styled('nav', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  
  '@md': {
    display: 'none',
  },
});

const NavLink = styled('a', {
  color: '$textDark',
  textDecoration: 'none',
  fontWeight: '$2',
  transition: 'color 0.3s ease',
  position: 'relative',
  
  '&:hover': {
    color: '$primary',
  },
  
  '&:hover::after': {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '$primary',
    animation: 'underline 0.3s ease-out',
  },
});

const MenuToggle = styled('button', {
  background: 'none',
  border: '1px solid $primary',
  borderRadius: '$1',
  padding: '$2',
  cursor: 'pointer',
  color: '$primary',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: '$backgroundLight',
  },
});

const MobileMenu = styled('div', {
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  backgroundColor: '$background',
  borderTop: '1px solid $border',
  boxShadow: '$3',
  zIndex: '$max',
  
  '@md': {
    display: 'none',
  },
});

const MobileMenuContainer = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '$4',
});

const MobileMenuNav = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
});

const MobileMenuLink = styled('a', {
  display: 'block',
  padding: '$3 0',
  color: '$textDark',
  textDecoration: 'none',
  fontWeight: '$2',
  borderBottom: '1px solid $borderLight',
  transition: 'color 0.3s ease',
  
  '&:hover': {
    color: '$primary',
  },
  
  '&:last-child': {
    borderBottom: 'none',
  },
});

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Header>
      <HeaderInner>
        <Logo href="#top" aria-label="Harmonia Rząska — strona główna">
          <img src="/assets/logo-harmonia-rzaska.svg" alt="Harmonia Rząska" height={40} />
        </Logo>

        {/* DESKTOP NAV */}
        <DesktopNav>
          <NavLink href="#o-nas">O nas</NavLink>
          <NavLink href="#lokale">Lokale</NavLink>
          <NavLink href="#galeria">Galeria</NavLink>
          <NavLink href="#kontakt">Kontakt</NavLink>
          <ButtonLink 
            href="/assets/prospekt-harmonia-rzaska.pdf" 
            target="_blank" 
            rel="noopener"
            variant="primary"
            size="md"
          >
            <Download size={16} />
            Prospekt
          </ButtonLink>
          <ButtonLink 
            href="tel:+48730090030"
            variant="secondary"
            size="md"
          >
            <Phone size={16} />
            730 090 030
          </ButtonLink>
        </DesktopNav>

        {/* MOBILE NAV */}
        <MobileNav>
          <ButtonLink 
            href="/assets/prospekt-harmonia-rzaska.pdf" 
            target="_blank" 
            rel="noopener"
            variant="primary"
            size="sm"
          >
            <Download size={16} />
            Prospekt
          </ButtonLink>
          <ButtonLink 
            href="tel:+48730090030"
            variant="secondary"
            size="sm"
          >
            <Phone size={16} />
            730 090 030
          </ButtonLink>
          <MenuToggle 
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={24} />
          </MenuToggle>
        </MobileNav>
      </HeaderInner>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <MobileMenu>
          <MobileMenuContainer>
            <MobileMenuNav>
              <MobileMenuLink href="#o-nas" onClick={() => setIsMenuOpen(false)}>
                O nas
              </MobileMenuLink>
              <MobileMenuLink href="#lokale" onClick={() => setIsMenuOpen(false)}>
                Lokale
              </MobileMenuLink>
              <MobileMenuLink href="#galeria" onClick={() => setIsMenuOpen(false)}>
                Galeria
              </MobileMenuLink>
              <MobileMenuLink href="#kontakt" onClick={() => setIsMenuOpen(false)}>
                Kontakt
              </MobileMenuLink>
            </MobileMenuNav>
          </MobileMenuContainer>
        </MobileMenu>
      )}
    </Header>
  );
}
