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
    const anchors = Array.from(document.querySelectorAll('.nav a[href^="#"], a[href^="#"][data-smooth]'));
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
      if (window.scrollY > 10) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      anchors.forEach(a => a.removeEventListener("click", onAnchor));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <Component {...pageProps} />
    </>
  );
}
