import { getSessionFromCookies } from '@/lib/session';
import db, { CName } from '@/services/mongodb';
import { redirect } from 'next/navigation';
import { PropertyDoc } from '@/app/api/property/property';
import PropertyManagerClient from './PropertyManagerClient';

export const dynamic = 'force-dynamic';

export default async function MyPropertiesPage() {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect('/auth/login');
  }

  let properties: PropertyDoc[] = [];
  try {
    properties = await db.collection<PropertyDoc>(CName.Properties)
      .find({ userId: session.uid })
      .limit(100)
      .toArray();
  } catch (err) {
    console.error('Failed to load properties for user', session.uid, err);
  }

  // Map to lightweight serializable view model for client
  const clientProps = properties.map(p => ({
    slug: p.slug,
    title: p.title,
    address: p.address,
    city: p.city,
    country: p.country,
    bedrooms: p.bedrooms || 0,
    image: (p.images && p.images.length > 0)
      ? p.images.map(id => `/api/image/${id}`)
      : ['/api/placeholder/300/200'],
    visibility: 'private',
    type: p.type,
    rating: 4,
    reviewsCount: Math.floor(Math.random() * 100)

  }));

  return <PropertyManagerClient properties={clientProps} />;
}