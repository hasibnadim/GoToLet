import Image from 'next/image';
import HomeSearchBox from '@/components/HomeSearchBox';
import db, { CName } from '@/services/mongodb';
import { PropertyDoc } from '@/app/api/property/property';
import PublicPropertyList, { PublicProperty } from '@/components/PublicPropertyList';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch up to 100*? For initial load limit to 300 and paginate client side at 100 per page
  let properties: PropertyDoc[] = [];
  try {
    properties = await db.collection<PropertyDoc>(CName.Properties)
      .find({ visibility: { $ne: 'private' } })
      .limit(300)
      .toArray();
  } catch (e) {
    console.error('Failed to fetch properties for home', e);
  }

  const listItems: PublicProperty[] = properties.map(p => ({
    slug: p.slug,
    title: p.title,
    address: p.address,
    city: p.city,
    country: p.country,
    bedrooms: p.bedrooms || 0,
    image: (p.images && p.images.length > 0) ? p.images.map(id => `/api/image/${id}`) : ['/api/placeholder/300/200'],
    type: p.type,
    rating: 4,
    reviewsCount: Math.floor(Math.random()*200)
  }));

  return (
    <div className="min-h-screen">
      {/* Minimal Search Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-pink-200/15 to-purple-200/15 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-gradient-to-tr from-blue-200/15 to-cyan-200/15 rounded-full blur-xl"></div>
        </div>
        
        {/* Search Box Only */}
        <div className="relative z-10 px-6">
          <HomeSearchBox />
        </div>
      </section> 

      {/* All Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-6 w-full">
          <PublicPropertyList properties={listItems} pageSize={100} />
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-16 bg-white">
        <div className="px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left side */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your safety is our priority
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Every property is verified by our team. We ensure safe, clean, and comfortable accommodations for all our guests.
              </p>
              <div className="space-y-4">
                {[
                  'Verified properties and hosts',
                  '24/7 customer support',
                  'Secure payment processing',
                  'Guest protection guarantee'
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side */}
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
                alt="Safe and verified properties"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
