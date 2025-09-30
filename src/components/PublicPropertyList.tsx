"use client";
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { PropertyCardBase, BasePropertyData } from '@/components/properties/PropertyCardBase';

export interface PublicProperty {
  slug: string;
  title: string;
  address: string;
  city: string;
  country: string;
  bedrooms: number;
  image: string[]; // URLs
  type: string;
  rating?: number;
  reviewsCount?: number;
}

interface Props {
  properties: PublicProperty[];
  pageSize?: number; // default 100
  enableSearch?: boolean;
}

export default function PublicPropertyList({ properties, pageSize = 100, enableSearch = false }: Props) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    if (!searchTerm) return properties;
    const s = searchTerm.toLowerCase();
    return properties.filter(p => p.title.toLowerCase().includes(s) || p.city.toLowerCase().includes(s) || p.address.toLowerCase().includes(s));
  }, [properties, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if ((page - 1) * pageSize >= filtered.length) setPage(1);
  }, [filtered.length, page, pageSize]);

  const buildGridCard = (p: PublicProperty) => (
    <PropertyCardBase key={p.slug} property={p as BasePropertyData} variant='grid' />
  );
  const buildListItem = (p: PublicProperty) => (
    <PropertyCardBase key={p.slug} property={p as BasePropertyData} variant='list' />
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-gray-900">Popular in your area</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>Grid</button>
            <button onClick={() => setViewMode('list')} className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>List</button>
          </div>
        </div>
      </div>

      {enableSearch && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {current.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center text-gray-600">No properties found.</div>
      ) : (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {current.map(buildGridCard)}
          </div>
        ) : (
          <div className="space-y-4">
            {current.map(buildListItem)}
          </div>
        )
      )}

      {totalPages >= 1 && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-sm">
            <span className="text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex items-center gap-2">
              <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1.5 rounded border text-gray-600 disabled:opacity-40 bg-white hover:bg-gray-50">Prev</button>
              <button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)} className="px-3 py-1.5 rounded border text-gray-600 disabled:opacity-40 bg-white hover:bg-gray-50">Next</button>
            </div>
        </div>
      )}
    </div>
  );
}
