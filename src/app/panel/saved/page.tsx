'use client';

import { useState } from 'react';
import { Heart, MapPin, Star, Share, Grid, List } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const savedProperties = [
  {
    id: 1,
    title: "Luxury Penthouse in Gulshan",
    location: "Gulshan-2, Dhaka",
    rent: 45000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    savedDate: "2024-09-20",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    labels: [
      { text: "Luxury", color: "purple" },
      { text: "Furnished", color: "blue" }
    ]
  },
  {
    id: 2,
    title: "Modern Studio in Dhanmondi",
    location: "Dhanmondi, Dhaka",
    rent: 18000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80",
    savedDate: "2024-09-18",
    propertyType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    labels: [
      { text: "Modern", color: "green" },
      { text: "WiFi", color: "blue" }
    ]
  },
  {
    id: 3,
    title: "Family House in Uttara",
    location: "Uttara, Dhaka",
    rent: 35000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80",
    savedDate: "2024-09-15",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: 1800,
    labels: [
      { text: "Family", color: "green" },
      { text: "Garden", color: "green" }
    ]
  },
  {
    id: 4,
    title: "Cozy Mess in Wari",
    location: "Wari, Dhaka",
    rent: 8000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80",
    savedDate: "2024-09-10",
    propertyType: "Mess",
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    labels: [
      { text: "Budget", color: "green" },
      { text: "Meals", color: "blue" }
    ]
  }
];

export default function SavedPropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const handleUnsave = (propertyId: number) => {
    // Handle removing from saved properties
    alert(`Property ${propertyId} removed from saved properties`);
  };

  const handleShare = (property: typeof savedProperties[0]) => {
    // Handle sharing property
    alert(`Sharing ${property.title}`);
  };

  const filteredProperties = savedProperties.filter(property => {
    if (filterType === 'all') return true;
    return property.propertyType.toLowerCase() === filterType;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
      case 'oldest':
        return new Date(a.savedDate).getTime() - new Date(b.savedDate).getTime();
      case 'price-low':
        return a.rent - b.rent;
      case 'price-high':
        return b.rent - a.rent;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Properties</h1>
          <p className="text-gray-600 mt-2">Properties you&apos;ve saved for later</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Saved</p>
              <p className="text-3xl font-bold text-gray-900">{savedProperties.length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Price</p>
              <p className="text-3xl font-bold text-gray-900">
                ৳{Math.round(savedProperties.reduce((sum, p) => sum + p.rent, 0) / savedProperties.length).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">
                {(savedProperties.reduce((sum, p) => sum + p.rating, 0) / savedProperties.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({savedProperties.length})
            </button>
            <button
              onClick={() => setFilterType('apartment')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'apartment'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Apartments ({savedProperties.filter(p => p.propertyType === 'Apartment').length})
            </button>
            <button
              onClick={() => setFilterType('house')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'house'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Houses ({savedProperties.filter(p => p.propertyType === 'House').length})
            </button>
            <button
              onClick={() => setFilterType('studio')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'studio'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Studios ({savedProperties.filter(p => p.propertyType === 'Studio').length})
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Properties Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={property.image}
                  alt={property.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleShare(property)}
                    className="p-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-colors"
                  >
                    <Share className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleUnsave(property.id)}
                    className="p-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-colors"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {property.labels.map((label) => (
                    <span 
                      key={label.text} 
                      className={`px-2 py-1 text-xs rounded-full ${
                        label.color === 'green' ? 'bg-green-100 text-green-700' :
                        label.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        label.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {label.text}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">৳{property.rent.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex gap-6">
                <Image
                  src={property.image}
                  alt={property.title}
                  width={200}
                  height={150}
                  className="w-48 h-36 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{property.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-sm">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="ml-1 font-medium">{property.rating}</span>
                      </div>
                      <button
                        onClick={() => handleShare(property)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Share className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUnsave(property.id)}
                        className="p-2 text-red-500 hover:text-red-600"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div>{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</div>
                    <div>{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</div>
                    <div>{property.area} sqft</div>
                    <div>Saved {new Date(property.savedDate).toLocaleDateString()}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.labels.map((label) => (
                      <span 
                        key={label.text} 
                        className={`px-2 py-1 text-xs rounded-full ${
                          label.color === 'green' ? 'bg-green-100 text-green-700' :
                          label.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                          label.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {label.text}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">৳{property.rent.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm">/month</span>
                    </div>
                    <Link
                      href={`/properties/${property.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedProperties.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved properties found</h3>
          <p className="text-gray-500 mb-4">Start exploring and save properties you like!</p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-block"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
}