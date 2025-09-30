"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Eye, Edit, Trash2, MapPin, Bed } from 'lucide-react';
import Image from 'next/image';

export interface PropertyListItemData {
  slug: string;
  title: string;
  address: string;
  city: string;
  country: string;
  bedrooms: number;
  images: string[];
  visibility?: string;
  type?: string;
  rating?: number;
  reviewsCount?: number;
}

interface Props {
  items: PropertyListItemData[];
  initialView?: 'grid' | 'list';
  pageSize?: number;
  showOwnerActions?: boolean; // for manager context
}

const PlaceholderImage = '/api/placeholder/300/200';

const RatingStars = ({ rating, reviews }: { rating?: number; reviews?: number }) => {
  const hasValue = (typeof rating === 'number' && rating > 0) || (typeof reviews === 'number' && reviews > 0);
  const value = hasValue && typeof rating === 'number' ? Math.max(0, Math.min(5, rating)) : 0;
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className="flex items-center gap-0.5" aria-label={hasValue ? `Rating ${value.toFixed(1)} out of 5` : 'No ratings yet'}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (!hasValue) return <svg key={i} className="w-3.5 h-3.5 text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.402 8.173L12 18.897l-7.336 3.873 1.402-8.173L.132 9.211l8.2-1.193z"/></svg>;
        const full = i < Math.floor(rounded);
        const half = !full && i < rounded;
        return (
          <svg key={i} className={`w-3.5 h-3.5 ${full || half ? 'text-amber-500' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.402 8.173L12 18.897l-7.336 3.873 1.402-8.173L.132 9.211l8.2-1.193z"/></svg>
        );
      })}
      {hasValue && <span className="ml-1 text-[10px] font-medium text-gray-600 tabular-nums">{value.toFixed(1)}</span>}
    </div>
  );
};

function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const safe = images.length ? images : [PlaceholderImage];
  return (
    <div className="relative h-48 bg-gray-100 overflow-hidden">
      <Image src={safe[0]} alt={alt} fill className="object-cover" unoptimized />
    </div>
  );
}

export default function PropertyList({ items, initialView = 'grid', pageSize = 100, showOwnerActions = false }: Props) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">All Properties</h2>
        <div className="flex items-center gap-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`px-3 py-2 text-sm ${viewMode==='grid'?'bg-blue-600 text-white':'bg-white text-gray-600 hover:bg-gray-50'}`}>Grid</button>
            <button onClick={() => setViewMode('list')} className={`px-3 py-2 text-sm ${viewMode==='list'?'bg-blue-600 text-white':'bg-white text-gray-600 hover:bg-gray-50'}`}>List</button>
          </div>
        </div>
      </div>

      {currentItems.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center text-gray-600">No properties available.</div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map(p => (
            <div key={p.slug} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <ImageSlider images={p.images} alt={p.title} />
              <div className="p-4 flex flex-col gap-2 flex-1">
                <Link href={`/${p.slug}`} className="font-semibold text-gray-900 leading-snug line-clamp-2">{p.title}</Link>
                <RatingStars rating={p.rating} reviews={p.reviewsCount} />
                <div className="flex items-start text-gray-600 text-xs gap-1">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-gray-400" />
                  <span className="line-clamp-2">{p.address}, {p.city}, {p.country}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 mt-auto">
                  {p.type && <span className="px-2 py-0.5 bg-gray-100 rounded-md capitalize">{p.type}</span>}
                  {p.bedrooms > 0 && <span className="px-2 py-0.5 bg-gray-100 rounded-md inline-flex items-center gap-1"><Bed className="w-3 h-3" /> {p.bedrooms}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentItems.map(p => (
            <div key={p.slug} className="group bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow flex gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <Image src={p.images[0] || PlaceholderImage} alt={p.title} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <Link href={`/${p.slug}`} className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{p.title}</Link>
                <RatingStars rating={p.rating} reviews={p.reviewsCount} />
                <div className="flex items-start text-gray-600 text-xs gap-1">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-gray-400" />
                  <span className="truncate">{p.city}, {p.country}</span>
                </div>
                <div className="flex items-center gap-3 mt-auto text-[11px] text-gray-500">
                  {p.type && <span className="capitalize">{p.type}</span>}
                  {p.bedrooms > 0 && <span className="inline-flex items-center gap-1"><Bed className="w-3 h-3" /> {p.bedrooms}</span>}
                </div>
              </div>
              {showOwnerActions && (
                <div className="flex flex-col gap-2">
                  <button aria-label="View" className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                  <button aria-label="Edit" className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-green-600"><Edit className="w-4 h-4" /></button>
                  <button aria-label="Delete" className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4 mt-4">
          <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
          <div className="flex items-center gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p-1)} className="px-3 py-1.5 text-sm rounded border disabled:opacity-40 bg-white hover:bg-gray-50">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p+1)} className="px-3 py-1.5 text-sm rounded border disabled:opacity-40 bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
