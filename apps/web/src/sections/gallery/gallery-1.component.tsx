/// <reference types="vite/client" />
import type { z } from 'zod';
import { gallery1Schema } from '@static-site-generator/schema';

type Gallery1Props = z.infer<typeof gallery1Schema>;

interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

const galleryModules = import.meta.glob<{ default: string }>(
  '../../public/assets/gallery/**/*.{png,jpg,jpeg,svg,webp}',
  { eager: true, query: '?url', import: 'default' },
);

const discoveredImages: GalleryImage[] = Object.values(galleryModules).map(
  (mod) => ({ src: mod.default }),
);

export function Gallery1({ title, items }: Gallery1Props) {
  const images: GalleryImage[] = items && items.length > 0 ? items : discoveredImages;

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col items-center p-8 gap-6">
      {title && (
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          {title}
        </h2>
      )}
      <div className="grid grid-cols-3 gap-4">
        {images.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <img
              src={item.src}
              alt={item.alt ?? ''}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            {item.caption && (
              <p className="mt-1 text-sm text-center" style={{ color: 'var(--color-muted-foreground)' }}>
                {item.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
