"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Star } from 'lucide-react';

export interface BasePropertyData {
  slug: string;
  title: string;
  address: string;
  city: string;
  country: string;
  bedrooms: number;
  image: string[];
  type: string;
  visibility?: string;
  rating?: number;
  reviewsCount?: number;
}

export const formatPropertyType = (type?: string) => {
  if (!type) return '';
  const cleaned = type.replace(/[-_]+/g, ' ').trim().toLowerCase().replace(/\s+/g, ' ');
  return cleaned.split(' ').map(w => w ? w[0].toUpperCase() + w.slice(1) : '').join(' ');
};

export const RatingStars = ({ rating, reviews }: { rating?: number; reviews?: number }) => {
  const hasValue = (typeof rating === 'number' && rating > 0) || (typeof reviews === 'number' && reviews > 0);
  const value = hasValue && typeof rating === 'number' ? Math.max(0, Math.min(5, rating)) : 0;
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className="flex items-center gap-0.5" aria-label={hasValue ? `Rating ${value.toFixed(1)} out of 5` : 'No ratings yet'}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (!hasValue) return <Star key={i} className="w-3.5 h-3.5 text-gray-300" />;
        return (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < Math.floor(rounded) ? 'text-amber-500 fill-amber-500' : i < rounded ? 'text-amber-500 fill-amber-500/50' : 'text-gray-300'}`}
          />
        );
      })}
      {hasValue && (
        <>
          <span className="ml-1 text-[10px] font-medium text-gray-600 tabular-nums">{value.toFixed(1)}</span>
          {typeof reviews === 'number' && reviews > 0 && (
            <span className="text-[10px] text-gray-400">({reviews})</span>
          )}
        </>
      )}
    </div>
  );
};

export const MetaPill = ({ icon: Icon, children }: { icon?: any; children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {children}
  </span>
);

export const PropertyImageSlider = ({ images, alt, variant }: { images: string[]; alt: string; variant: 'grid' | 'list' }) => {
  const safeImages = images && images.length > 0 ? images : ['/api/placeholder/300/200'];
  const [index, setIndex] = useState(0);
  const total = safeImages.length;
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % total), 4500);
    return () => clearInterval(timer);
  }, [total]);
  const go = (dir: number) => setIndex(i => (i + dir + total) % total);
  return (
    <div className={`group relative overflow-hidden ${variant === 'grid' ? 'h-48' : 'w-20 h-20 rounded-lg'} bg-gray-100`}>
      {safeImages.map((src, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src={src}
            alt={alt}
            fill={variant === 'grid'}
            width={variant === 'list' ? 80 : undefined}
            height={variant === 'list' ? 80 : undefined}
            className={`${variant === 'grid' ? 'object-cover w-full h-full' : 'object-cover w-full h-full rounded-lg'}`}
            unoptimized
          />
        </div>
      ))}
      {total > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous" className="opacity-0 group-hover:opacity-100 transition absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 rounded-full text-xs flex items-center justify-center">‹</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next" className="opacity-0 group-hover:opacity-100 transition absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 rounded-full text-xs flex items-center justify-center">›</button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {safeImages.map((_, i) => (
              <button key={i} aria-label={`Go to image ${i + 1}`} onClick={(e) => { e.stopPropagation(); setIndex(i); }} className={`h-1.5 w-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'} transition`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

interface BaseCardProps {
  property: BasePropertyData;
  variant: 'grid' | 'list';
  linkHref?: string; // defaults to /slug
  overlay?: React.ReactNode; // top-left/top-right overlay area (status badge)
  footer?: React.ReactNode; // footer area (actions/status info)
  className?: string;
  linkAriaLabelPrefix?: string;
}

export function PropertyCardBase({ property, variant, linkHref, overlay, footer, className = '', linkAriaLabelPrefix = 'View' }: BaseCardProps) {
  const href = linkHref || `/${property.slug}`;
  if (variant === 'list') {
    return (
      <div className={`group bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow flex gap-4 ${className}`}>        
        <div className="relative flex-shrink-0">
          <PropertyImageSlider images={property.image} alt={property.title} variant='list' />
          {overlay}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div className="flex items-start gap-4">
            <Link href={href} className="min-w-0 space-y-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md" aria-label={`${linkAriaLabelPrefix} ${property.title} details`}>
              <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{property.title}</h3>
              <RatingStars rating={property.rating} reviews={property.reviewsCount} />
              <div className="flex items-start text-gray-600 text-xs leading-snug gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-400" />
                <p className="line-clamp-2">{property.address}<br />{property.city}, {property.country}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <MetaPill>{formatPropertyType(property.type) || 'n/a'}</MetaPill>
                {property.bedrooms > 0 && <MetaPill icon={Bed}>{property.bedrooms} Bed{property.bedrooms > 1 && 's'}</MetaPill>}
              </div>
            </Link>
          </div>
          {footer}
        </div>
      </div>
    );
  }
  return (
    <div className={`max-w-96 group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col ${className}`}>      
      <div className="relative">
        <PropertyImageSlider images={property.image} alt={property.title} variant='grid' />
        {overlay}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link href={href} className="flex flex-col gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md" aria-label={`${linkAriaLabelPrefix} ${property.title} details`}>
          <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">{property.title}</h3>
          <RatingStars rating={property.rating} reviews={property.reviewsCount} />
          <div className="flex items-start text-gray-600 text-xs leading-snug gap-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
            <p className="line-clamp-3">{property.address}<br />{property.city}, {property.country}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <MetaPill>{formatPropertyType(property.type) || 'n/a'}</MetaPill>
            {property.bedrooms > 0 && <MetaPill icon={Bed}>{property.bedrooms} Bed{property.bedrooms > 1 && 's'}</MetaPill>}
          </div>
        </Link>
        {footer}
      </div>
    </div>
  );
}
