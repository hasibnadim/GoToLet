"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  alt: string;
  autoIntervalMs?: number;
}

// Simple accessible image carousel/slider
export default function ImageCarousel({ images, alt, autoIntervalMs = 5000 }: Props) {
  const safeImages = images && images.length > 0 ? images : ['/api/placeholder/800/450'];
  const [index, setIndex] = useState(0);
  const total = safeImages.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const go = useCallback((delta: number) => {
    setIndex(i => (i + delta + total) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    if (total <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), autoIntervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [go, total, autoIntervalMs]);

  // Keyboard navigation
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { go(1); }
    if (e.key === 'ArrowLeft') { go(-1); }
  };

  return (
    <div className="relative w-full h-72 sm:h-96 group" role="region" aria-label="Property images" tabIndex={0} onKeyDown={onKey}>
      {safeImages.map((src, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'} bg-gray-100`}>
          <Image src={src} alt={alt} fill className="object-cover" priority={i === 0} unoptimized />
        </div>
      ))}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center text-lg"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center text-lg"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {safeImages.map((_, i) => (
              <button
                key={i}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-4 rounded-full ${i === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'} transition`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
