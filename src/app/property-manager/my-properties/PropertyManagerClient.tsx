"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Building2, Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { PropertyCardBase, BasePropertyData } from '@/components/properties/PropertyCardBase';

// Shape coming from server (mapped)
export interface ClientProperty {
  slug: string;
  title: string;
  address: string;
  city: string;
  country: string;
  bedrooms: number;
  image: string[]; // Array of image URLs
  visibility: string;
  type: string;
  rating?: number; // 0-5
  reviewsCount?: number;
}

interface Props {
  properties: ClientProperty[];
}

function PropertyManagerClient({ properties }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filtered = useMemo(() => {
    return properties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || p.visibility === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [properties, searchTerm, filterStatus]);

  // Reused components now come from shared base

  const ActionButton = ({ label, children, color }: { label: string; children: React.ReactNode; color?: 'blue' | 'green' | 'red' }) => (
    (() => {
      const colorMap: Record<string, string> = {
        blue: 'hover:text-blue-600 focus:ring-blue-500',
        green: 'hover:text-green-600 focus:ring-green-500',
        red: 'hover:text-red-600 focus:ring-red-500'
      };
      const colorClasses = colorMap[color || 'blue'];
      return (
        <button
          aria-label={label}
          className={`p-2 rounded-lg text-gray-400 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 ${colorClasses}`}
          type="button"
        >
          {children}
        </button>
      );
    })()
  );

  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center px-2 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-full shadow-sm ${getStatusColor(status)}`}>
      {status || 'Unknown'}
    </span>
  );

  // Build manager specific footers & overlays using shared base
  const buildGridCard = (p: ClientProperty) => {
    const footer = (
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          {p.visibility === 'private' && <StatusBadge status={p.visibility} />}
          <span className="hidden sm:inline">Slug: {p.slug}</span>
        </div>
        <div className="flex items-center gap-1">
          <ActionButton label="View" color='blue'><Eye className="w-4 h-4" /></ActionButton>
          <ActionButton label="Edit" color='green'><Edit className="w-4 h-4" /></ActionButton>
          <ActionButton label="Delete" color='red'><Trash2 className="w-4 h-4" /></ActionButton>
        </div>
      </div>
    );
    const overlay = p.visibility !== 'private' && (
      <div className="absolute top-3 left-3 pointer-events-none">
        <StatusBadge status={p.visibility} />
      </div>
    );
    return <PropertyCardBase key={p.slug} property={p as BasePropertyData} variant='grid' overlay={overlay} footer={footer} />;
  };

  const buildListItem = (p: ClientProperty) => {
    const footer = (
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2 text-[11px] text-gray-500 truncate">
          {p.visibility === 'private' && <StatusBadge status={p.visibility} />}
          <span className="hidden sm:inline">Slug: {p.slug}</span>
        </div>
        <div className="flex items-center gap-1">
          <ActionButton label="View" color='blue'><Eye className="w-4 h-4" /></ActionButton>
          <ActionButton label="Edit" color='green'><Edit className="w-4 h-4" /></ActionButton>
          <ActionButton label="Delete" color='red'><Trash2 className="w-4 h-4" /></ActionButton>
        </div>
      </div>
    );
    const overlay = p.visibility !== 'private' && (
      <div className="absolute top-2 left-2 pointer-events-none">
        <StatusBadge status={p.visibility} />
      </div>
    );
    return <PropertyCardBase key={p.slug} property={p as BasePropertyData} variant='list' overlay={overlay} footer={footer} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
          <p className="text-gray-600 mt-1">Manage your property listings</p>
        </div>
        <Link
          href="/property-manager/add-property"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Link>
      </div>

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
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
            </select>
          </div>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filter criteria' : 'Start by adding your first property listing'}
          </p>
          <Link
            href="/property-manager/add-property"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Property
          </Link>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {filtered.map(p => (
            viewMode === 'grid' ? buildGridCard(p) : buildListItem(p)
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyManagerClient;