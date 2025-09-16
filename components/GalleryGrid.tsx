/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { GalleryItem } from "@/lib/loadGallery";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null;
  return (
    <div className="gallery-slider" aria-label="Galeria zdjęć osiedla">
      <div className="gallery-main">
        <img src={items[0]?.src} alt={items[0]?.alt ?? "Zdjęcie 1"} loading="eager" />
      </div>
      <div className="gallery-thumbs">
        {items.map((it, i) => (
          <div key={i} className={`gallery-thumb ${i === 0 ? "active" : ""}`}>
            <img src={it.src} alt={it.alt ?? `Zdjęcie ${i+1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
