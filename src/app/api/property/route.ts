import { NextRequest, NextResponse } from 'next/server';
import { createProperty, CreatePropertyData } from '@/app/api/property/property';
import db, { CName } from '@/services/mongodb';
import { ObjectId } from 'mongodb';
import sharp from 'sharp';
import { getSessionFromRequest } from '@/lib/session';

// Configuration for maximum body size (30MB)
export const maxDuration = 30; // 30 seconds timeout
export const dynamic = 'force-dynamic';

// Types for the request
interface PropertyRequestBody extends Omit<CreatePropertyData, 'images'> {
  images?: string[]; // Base64 encoded images
  visibility?: 'private' | 'active' | 'draft';
}

interface CompressedImage {
  data: Buffer;
  contentType: string;
  originalName: string;
  size: number;
}

// Image compression utility
async function compressImage(base64Image: string, originalName: string): Promise<CompressedImage> {
  try {
    // Extract base64 data and content type
    const matches = base64Image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Invalid base64 image format');
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Compress image using Sharp
    let compressedBuffer: Buffer;
    const isWebP = contentType === 'image/webp';

    if (isWebP) {
      // For WebP images, just resize if needed
      compressedBuffer = await sharp(imageBuffer)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85 })
        .toBuffer();
    } else {
      // Convert other formats to WebP for better compression
      compressedBuffer = await sharp(imageBuffer)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85 })
        .toBuffer();
    }

    return {
      data: compressedBuffer,
      contentType: 'image/webp',
      originalName,
      size: compressedBuffer.length
    };
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error(`Failed to compress image: ${originalName}`);
  }
}

// Save compressed images to MongoDB
async function saveImagesToMongoDB(images: CompressedImage[], propertySlug: string): Promise<string[]> {
  try {
    const imageCollection = db.collection(CName.Images);
    const imageIds: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageDoc = {
        propertySlug,
        data: image.data,
        contentType: image.contentType,
        originalName: image.originalName,
        size: image.size,
        order: i,
        createdAt: new Date(),
        isCompressed: true
      };

      const result = await imageCollection.insertOne(imageDoc);
      imageIds.push(result.insertedId.toString());
    }

    return imageIds;
  } catch (error) {
    console.error('Error saving images to MongoDB:', error);
    throw new Error('Failed to save images to database');
  }
}



export async function POST(request: NextRequest) {
  try {
    // validate user authentication here if needed
    const authUser = await getSessionFromRequest(request);
    if (!authUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    // Parse request body
    const body: PropertyRequestBody = await request.json();

    // Validate required fields
    if (!body.title || !body.phone || !body.address || !body.city || !body.country || !body.type || !body.google_embed_link) {
      return NextResponse.json(
        { error: 'Missing required fields: title, phone, address, city, country, type, google_embed_link' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.phone) || body.phone.length === 0) {
      return NextResponse.json(
        { error: 'At least one phone number is required' },
        { status: 400 }
      );
    }
    const propertyData: CreatePropertyData = {
      title: body.title,
      phone: body.phone,
      address: body.address,
      city: body.city,
      country: body.country,
      google_embed_link: body.google_embed_link || '',
      amenities: body.amenities || [],
      terms_conditions: body.terms_conditions || '',
      type: body.type || 'apartment',
      bedrooms: body.bedrooms,
      images: [], // Will be updated after saving images
      userId: authUser.uid, // Associate property with authenticated user
      visibility: body.visibility || 'active'
    };

    const createdProperty = await createProperty(propertyData);

    // Process images if provided
    let imageIds: string[] = [];
    if (body.images && body.images.length > 0) {
      try {
        // Compress all images
        const compressPromises = body.images.map((base64Image, index) =>
          compressImage(base64Image, `image_${index + 1}`)
        );

        const compressedImages = await Promise.all(compressPromises);

        // Calculate total compressed size
        const totalCompressedSize = compressedImages.reduce((sum, img) => sum + img.size, 0);
        console.log(`Compressed ${compressedImages.length} images. Total size: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);


        // Save compressed images to MongoDB
        imageIds = await saveImagesToMongoDB(compressedImages, createdProperty.slug);

        // Update property with image IDs
        const propertyCollection = db.collection(CName.Properties);
        await propertyCollection.updateOne(
          { slug: createdProperty.slug },
          { $set: { images: imageIds } }
        );

        return NextResponse.json({
          success: true,
          data: {
            ...createdProperty,
            images: imageIds
          },
          meta: {
            totalImages: imageIds.length,
            totalCompressedSize: `${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`
          }
        }, { status: 201 });

      } catch (imageError) {
        console.error('Error processing images:', imageError);
      }
    }
    // else ignore images and return created property
    return NextResponse.json({
      success: true,
      data: createdProperty
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating property:', error);

    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('already in use')) {
        return NextResponse.json(
          { error: error.message },
          { status: 409 } // Conflict
        );
      }

      if (error.message.includes('Request body too large')) {
        return NextResponse.json(
          { error: error.message },
          { status: 413 } // Payload Too Large
        );
      }

      if (error.message.includes('required') || error.message.includes('validation')) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 } // Bad Request
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// GET method to retrieve property images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imageId');
    const propertySlug = searchParams.get('propertySlug');

    if (!imageId && !propertySlug) {
      return NextResponse.json(
        { error: 'Either imageId or propertySlug is required' },
        { status: 400 }
      );
    }

    const imageCollection = db.collection(CName.Images);

    if (imageId) {
      // Get specific image by ID
      const image = await imageCollection.findOne({ _id: new ObjectId(imageId) });

      if (!image) {
        return NextResponse.json(
          { error: 'Image not found' },
          { status: 404 }
        );
      }

      return new NextResponse(image.data, {
        headers: {
          'Content-Type': image.contentType,
          'Content-Length': image.size.toString(),
          'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        },
      });
    } else if (propertySlug) {
      // Get all images for a property
      const images = await imageCollection.find(
        { propertySlug },
        { projection: { data: 0 } } // Exclude image data, just metadata
      ).sort({ order: 1 }).toArray();

      return NextResponse.json({
        success: true,
        data: images.map(img => ({
          id: img._id,
          originalName: img.originalName,
          size: img.size,
          contentType: img.contentType,
          order: img.order,
          createdAt: img.createdAt
        }))
      });
    }

  } catch (error) {
    console.error('Error retrieving images:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve images' },
      { status: 500 }
    );
  }
}
