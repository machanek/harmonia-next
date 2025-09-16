import type { AppProps } from "next/app";
import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import { globalCss } from "@/lib/stitches.config";
// import "@/styles/dev.css"; // w parytecie trzymamy wyłączone

// Global styles
const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  
  body: {
    fontFamily: '$primary',
    lineHeight: '$4',
    color: '$textDark',
    backgroundColor: '$background',
    paddingTop: '80px', // Account for fixed header
  },
  
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  
  button: {
    fontFamily: 'inherit',
  },
  
  '@keyframes underline': {
    from: { width: 0 },
    to: { width: '100%' },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // Apply global styles
  globalStyles();
  
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  // Hook z eventami
  useEffect(() => {
    // Smooth anchors (#id)
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
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

    return () => {
      anchors.forEach(a => a.removeEventListener("click", onAnchor));
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <Component {...pageProps} />
    </>
  );
}
