import type { AppProps } from "next/app";
import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
// import "@/styles/dev.css"; // w parytecie trzymamy wyłączone

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  // Hook z eventami
  useEffect(() => {
    // Smooth anchors (#id)
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
      // zamknij mobile menu po kliknięciu
      const nav = document.getElementById("main-nav");
      const btn = document.querySelector<HTMLButtonElement>(".nav-toggle");
      if (nav?.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        btn?.setAttribute("aria-expanded", "false");
      }
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

    // Mobile nav toggle
    const btn = document.querySelector<HTMLButtonElement>(".nav-toggle");
    const nav = document.getElementById("main-nav");
    const onToggle = () => {
      if (!btn || !nav) return;
      const open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    btn?.addEventListener("click", onToggle);

    // Zamknij menu ESC i po kliknięciu poza
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (!nav?.classList.contains("is-open")) return;
      nav.classList.remove("is-open");
      btn?.setAttribute("aria-expanded", "false");
    };
    const onDocClick = (e: MouseEvent) => {
      if (!nav?.classList.contains("is-open")) return;
      const t = e.target as Node;
      if (nav.contains(t)) return;
      if (btn && btn.contains(t)) return;
      nav.classList.remove("is-open");
      btn?.setAttribute("aria-expanded", "false");
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);

    return () => {
      anchors.forEach(a => a.removeEventListener("click", onAnchor));
      window.removeEventListener("scroll", onScroll);
      btn?.removeEventListener("click", onToggle);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <Component {...pageProps} />
    </>
  );
}
