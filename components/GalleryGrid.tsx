/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { GalleryItem } from "@/lib/loadGallery";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null;
  return (
    <div id="gallery" className="gallery-grid" aria-label="Galeria zdjęć osiedla">
      {items.map((it, i) => (
        <a key={i} href={it.src} target="_blank" rel="noopener noreferrer" className="gallery-item">
          <img src={it.src} alt={it.alt ?? `Zdjęcie ${i+1}`} loading="lazy" />
        </a>
      ))}
    </div>
  );
}
