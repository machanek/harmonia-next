import type { AppProps } from "next/app";
import { useEffect } from "react";
// import "@/styles/dev.css"; // w parytecie trzymamy wyłączone

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Smooth anchors
    const anchors = Array.from(document.querySelectorAll('.main-nav a[href^="#"], a[href^="#"][data-smooth]'));
    const onAnchor = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    };
    anchors.forEach(a => a.addEventListener("click", onAnchor));

    // Sticky header
    const header = document.querySelector(".site-header");
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 10) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile nav toggle – używamy SSR-owego przycisku i istniejącego <nav id="main-nav">
    const btn = document.querySelector<HTMLButtonElement>(".nav-toggle");
    const nav = document.querySelector<HTMLElement>("#main-nav");
    const onToggle = () => {
      if (!btn || !nav) return;
      const open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    btn?.addEventListener("click", onToggle);

    return () => {
      anchors.forEach(a => a.removeEventListener("click", onAnchor));
      window.removeEventListener("scroll", onScroll);
      btn?.removeEventListener("click", onToggle);
    };
  }, []);

  return <Component {...pageProps} />;
}
