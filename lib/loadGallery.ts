import fs from "fs/promises";
import path from "path";

export type GalleryItem = {
  src: string;
  alt?: string | null;
  filename: string;
};

async function readGalleryImages(dirAbs: string): Promise<GalleryItem[]> {
  try {
    const entries = await fs.readdir(dirAbs);
    const imageFiles = entries.filter(f => {
      const ext = path.extname(f).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });
    
    return imageFiles.map(filename => ({
      src: `/images/gallery/${filename}`,
      alt: null,
      filename
    }));
  } catch {
    return [];
  }
}

export async function loadGallery(): Promise<GalleryItem[]> {
  const root = process.cwd();
  const galleryDir = path.join(root, "public", "images", "gallery");
  return await readGalleryImages(galleryDir);
}
