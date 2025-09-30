import { generateSlug } from '@/lib/utils';
import db, { CName } from '../../../services/mongodb';
import { Filter } from 'mongodb';

export interface PropertyDoc {
  slug: string;
  title: string;
  phone: string[];

  address: string;
  city: string;
  country: string;
  google_embed_link: string;

  amenities: string[];
  terms_conditions?: string;

  type: 'boys hostel' | 'girls hostel' | 'house' | 'apartment' | 'duplex' | 'bungalow' | 'farmhouse' | 'castle';

  bedrooms?: number;
  images: string[]; // Array of Google Drive file UIDs

  userId: string; // Owner user ID (uid)
  visibility?: 'private' | 'active' | 'draft';
}

export interface CreatePropertyData extends Omit<PropertyDoc, 'slug'> {
  slug?: string;
}


/**
 * Check if a phone number is already in use
 */
export async function isPhoneUnique(phone: string, excludeSlug?: string): Promise<boolean> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    const filter:Filter<PropertyDoc> = { phone: { $in: [phone] } };

    if (excludeSlug) {
      filter.slug = { $ne: excludeSlug };
    }

    const existingProperty = await collection.findOne(filter);
    return !existingProperty;
  } catch (error) {
    console.error('Error checking phone uniqueness:', error);
    throw new Error('Failed to validate phone number');
  }
}

/**
 * Check if a slug is already in use
 */
export async function isSlugUnique(slug: string): Promise<boolean> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    const existingProperty = await collection.findOne({ slug });
    return !existingProperty;
  } catch (error) {
    console.error('Error checking slug uniqueness:', error);
    throw new Error('Failed to validate slug');
  }
}

/**
 * Generate a unique slug for a property
 */
export async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = Math.floor(Math.random() * 100); // Start with a random counter to reduce collisions

  // Append counter until a unique slug is found

  while (!(await isSlugUnique(slug))) {
    slug = `${baseSlug}-${counter.toString(36)}`;
    counter = Math.floor(Math.random() * 100);
  }

  return slug;
}

/**
 * Create a new property
 */
export async function createProperty(propertyData: CreatePropertyData): Promise<PropertyDoc> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);

    // Validate phone numbers uniqueness
    for (const phone of propertyData.phone) {
      const isUnique = await isPhoneUnique(phone);
      if (!isUnique) {
        throw new Error(`Phone number ${phone} is already in use`);
      }
    }

    // Generate unique slug
    const slug = propertyData.slug || await generateUniqueSlug(propertyData.title);

    const newProperty: PropertyDoc = {
      ...propertyData,
      slug,
      visibility: (propertyData as any).visibility || 'active'
    };

    // Insert the property document
    await collection.insertOne(newProperty);

    return newProperty;
  } catch (error) {
    console.error('Error creating property:', error);
    if (error instanceof Error && error.message.includes('E11000')) {
      throw new Error('Property with this slug already exists');
    }
    throw error;
  }
}

/**
 * Get a property by slug
 */
export async function getProperty(slug: string): Promise<PropertyDoc | null> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    const property = await collection.findOne({ slug });
    return property || null;
  } catch (error) {
    console.error('Error getting property:', error);
    throw new Error('Failed to get property');
  }
}

/**
 * Update a property
 */
export async function updateProperty(slug: string, updates: Partial<PropertyDoc>): Promise<void> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);

    // If phone numbers are being updated, validate uniqueness
    if (updates.phone) {
      for (const phone of updates.phone) {
        const isUnique = await isPhoneUnique(phone, slug);
        if (!isUnique) {
          throw new Error(`Phone number ${phone} is already in use`);
        }
      }
    }

    const result = await collection.updateOne(
      { slug },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      throw new Error('Property not found');
    }
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
}

/**
 * Delete a property
 */
export async function deleteProperty(slug: string): Promise<void> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    const result = await collection.deleteOne({ slug });

    if (result.deletedCount === 0) {
      throw new Error('Property not found');
    }
  } catch (error) {
    console.error('Error deleting property:', error);
    throw new Error('Failed to delete property');
  }
}

/**
 * Get all properties with optional filtering
 */
export async function getProperties(options?: {
  type?: PropertyDoc['type'];
  city?: string;
  limit?: number;
  orderBy?: 'title' | 'city' | 'type';
}): Promise<PropertyDoc[]> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    const filter: Filter<PropertyDoc> = {};
    const sort: any = {};

    // Apply filters
    if (options?.type) {
      filter.type = options.type;
    }

    if (options?.city) {
      filter.city = options.city;
    }

    // Apply sorting
    if (options?.orderBy) {
      sort[options.orderBy] = 1;
    }

    let cursor = collection.find(filter);

    if (Object.keys(sort).length > 0) {
      cursor = cursor.sort(sort);
    }

    // Apply limit
    if (options?.limit) {
      cursor = cursor.limit(options.limit);
    }

    const properties = await cursor.toArray();
    return properties;
  } catch (error) {
    console.error('Error getting properties:', error);
    throw new Error('Failed to get properties');
  }
}

/**
 * Search properties by title, address, or city
 */
export async function searchProperties(searchTerm: string): Promise<PropertyDoc[]> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    // Use MongoDB text search if available, otherwise use regex
    const properties = await collection.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } },
        { city: { $regex: searchTerm, $options: 'i' } }
      ]
    }).toArray();

    return properties;
  } catch (error) {
    console.error('Error searching properties:', error);
    throw new Error('Failed to search properties');
  }
}

/**
 * Get properties by type
 */
export async function getPropertiesByType(type: PropertyDoc['type']): Promise<PropertyDoc[]> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    const properties = await collection.find({ type }).toArray();
    return properties;
  } catch (error) {
    console.error('Error getting properties by type:', error);
    throw new Error('Failed to get properties by type');
  }
}

/**
 * Get properties by city
 */
export async function getPropertiesByCity(city: string): Promise<PropertyDoc[]> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    const properties = await collection.find({ city }).toArray();
    return properties;
  } catch (error) {
    console.error('Error getting properties by city:', error);
    throw new Error('Failed to get properties by city');
  }
}

/**
 * Get properties with specific amenities
 */
export async function getPropertiesWithAmenities(amenities: string[]): Promise<PropertyDoc[]> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    const properties = await collection.find({
      amenities: { $in: amenities }
    }).toArray();
    return properties;
  } catch (error) {
    console.error('Error getting properties with amenities:', error);
    throw new Error('Failed to get properties with amenities');
  }
}

/**
 * Get property count by filters
 */
export async function getPropertyCount(filters?: {
  type?: PropertyDoc['type'];
  city?: string;
}): Promise<number> {
  try {
    const collection = db.collection<PropertyDoc>(CName.Properties);
    const filter: Filter<PropertyDoc> = {};

    if (filters?.type) {
      filter.type = filters.type;
    }

    if (filters?.city) {
      filter.city = filters.city;
    }

    return await collection.countDocuments(filter);
  } catch (error) {
    console.error('Error getting property count:', error);
    throw new Error('Failed to get property count');
  }
}

/**
 * Get image URLs for a property
 */
export function getPropertyImageUrls(imageIds: string[]): string[] {
  return imageIds.map(id => `/api/image/${id}`);
}

/**
 * Get property images metadata
 */
export async function getPropertyImages(propertySlug: string) {
  try {
    const imagesCollection = db.collection(CName.Images);
    const images = await imagesCollection.find(
      { propertySlug },
      { projection: { data: 0 } } // Exclude image data, just metadata
    ).sort({ order: 1 }).toArray();

    return images.map(img => ({
      id: img._id.toString(),
      url: `/api/image/${img._id}`,
      originalName: img.originalName,
      size: img.size,
      contentType: img.contentType,
      order: img.order,
      createdAt: img.createdAt
    }));
  } catch (error) {
    console.error('Error getting property images:', error);
    throw new Error('Failed to get property images');
  }
}
