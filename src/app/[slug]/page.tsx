import React from 'react';
import Image from 'next/image';
import { houses } from '../dummy';
import slugify from 'slugify';
import Link from 'next/link';



// This would be your actual API call
async function fetchPropertyBySlug(slug: string) : Promise<typeof houses[0] | null> {
  try {
    // Replace this with your actual API endpoint
    // Example: const response = await fetch(`/api/properties/${slug}`);
    // For now, simulating API call with local data

    const house = houses.find(h =>
      slugify(h.title, { lower: true }) === slug
    );

    return new Promise((resolve) => {
      setTimeout(() => resolve(house || null), 2000); // Simulate network delay
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}



export default async function House(
  { params }: { params: Promise<{ slug: string }> }
) {

  const { slug } = await params;

  const property = await fetchPropertyBySlug(slug);
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you are looking for does not exist.</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href="/"
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <Image
            height={400}
            width={800}
            src={property.image}
            alt={property.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <span className="text-3xl font-bold text-blue-600">৳{property.rent.toLocaleString()}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {property.location}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {property.label.map((label) => (
                <span
                  key={label.text}
                  className={`px-3 py-1 text-sm rounded-full ${label.color === 'green' ? 'bg-green-100 text-green-800' :
                    label.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      label.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        label.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                          label.color === 'red' ? 'bg-red-100 text-red-800' :
                            label.color === 'pink' ? 'bg-pink-100 text-pink-800' :
                              'bg-gray-100 text-gray-800'
                    }`}
                >
                  {label.text}
                </span>
              ))}
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Owner
              </button>
              <button className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors">
                Save Property
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 