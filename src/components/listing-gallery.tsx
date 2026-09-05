"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = { id: string; url: string; alt: string };

export function ListingGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-[16/9] w-full rounded-xl bg-slate-100" />;
  }

  const active = images[activeIndex];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
        <Image src={active.url} alt={active.alt} fill priority sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-current={index === activeIndex}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${
                index === activeIndex ? "border-teal-700" : "border-transparent hover:border-slate-300"
              }`}
            >
              <Image src={image.url} alt={image.alt} fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
