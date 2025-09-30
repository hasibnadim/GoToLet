import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import db, { CName } from '@/services/mongodb';

// Serve a single property image
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ imageId: string }> }
) {
  try {
    const { imageId } = await context.params;
    if (!imageId) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    if (!ObjectId.isValid(imageId)) {
      return NextResponse.json({ error: 'Invalid image ID format' }, { status: 400 });
    }

    const imageCollection = db.collection(CName.Images);
    const image: any = await imageCollection.findOne({ _id: new ObjectId(imageId) });
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Normalize buffer (Mongo Binary vs Buffer)
    let data: Buffer | Uint8Array = image.data;
    if (data && typeof data === 'object' && !Buffer.isBuffer(data) && 'buffer' in data) {
      try {
        // BSON Binary stores full buffer; slice by position if present
        const bin: any = data;
        data = Buffer.from(bin.buffer instanceof ArrayBuffer ? Buffer.from(bin.buffer) : bin.buffer);
      } catch {
        // fallback placeholder image data
        data = Buffer.from([ ]);
        // fallback --- IGNORE ---
        // data = Buffer.from([]); --- IGNORE ---
      }
    }

  const buf: Buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
    const uint8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    return new Response(uint8 as any, {
      headers: {
        'Content-Type': image.contentType || 'image/webp',
        'Content-Length': (image.size || uint8.byteLength).toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': `img-${imageId}`
      }
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
  }
}