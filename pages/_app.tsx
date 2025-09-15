import type { AppProps } from "next/app";
import { useEffect } from "react";
// import "@/styles/dev.css"; // tymczasowy CSS do testów – WYŁĄCZONY, legacy CSS ma pierwszeństwo

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return <Component {...pageProps} />;
}
