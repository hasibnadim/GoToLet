import React from 'react'; 
import Link from 'next/link';
import { getProperty, getPropertyImages, PropertyDoc } from '@/app/api/property/property'; 
import { getSessionFromCookies } from '@/lib/session';
import ImageCarousel from './ImageCarousel';

 

async function fetchFullProperty(slug: string) {
  const property = await getProperty(slug);
  if (!property) return null;
  const imagesMeta = await getPropertyImages(slug).catch(() => []);
  const imageUrls = imagesMeta.length > 0 ? imagesMeta.map(i => i.url) : property.images.map(id => `/api/image/${id}`);
  return { property, imageUrls };
}

export default async function PropertyDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getSessionFromCookies();
  const result = await fetchFullProperty(slug);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you are looking for does not exist.</p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }

  const { property, imageUrls } = result as { property: PropertyDoc & { visibility?: string }; imageUrls: string[] };

  // Visibility enforcement: if property is private and user isn't owner
  if (property.visibility === 'private' && (!session || session.uid !== property.userId)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Private Property</h1>
            <p className="text-gray-600 mb-6">This property is private. You don&apos;t have permission to view its details.</p>
            <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }
 

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/" className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {imageUrls.length > 0 && (
            <div className="relative">
              <ImageCarousel images={imageUrls} alt={property.title} />
              {property.visibility === 'private' && session?.uid === property.userId && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Private (Owner View)</span>
              )}
            </div>
          )}

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-start text-gray-600 text-sm gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  <span>{property.address}, {property.city}, {property.country}</span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                {property.type && <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 font-medium capitalize">{property.type}</span>}
                {typeof property.bedrooms === 'number' && <span className="text-sm text-gray-700">Bedrooms: {property.bedrooms}</span>}
              </div>
            </div>

            {property.amenities?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map(a => (
                    <span key={a} className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {property.terms_conditions && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Terms & Conditions</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">{property.terms_conditions}</p>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Location</h2>
              {property.google_embed_link ? (
                property.google_embed_link.toLowerCase().includes('<iframe') ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden border [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0" 
                    dangerouslySetInnerHTML={{ 
                      __html: property.google_embed_link.replace(/<script[\s\S]*?<\/script>/gi, '') 
                    }} 
                  />
                ) : (
                  <div className="aspect-video w-full rounded-lg overflow-hidden border">
                    <iframe src={property.google_embed_link} className="w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                  </div>
                )
              ) : (<p className="text-sm text-gray-500">No map available.</p>)}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Contact Owner</button>
              <button className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors">Save Property</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}