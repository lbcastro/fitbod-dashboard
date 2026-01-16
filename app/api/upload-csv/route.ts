import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No CSV file provided.' }, { status: 400 });
  }

  if (!file.name.toLowerCase().endsWith('.csv')) {
    return NextResponse.json({ error: 'Only CSV files are supported.' }, { status: 400 });
  }

  // Respond immediately to client
  const response = NextResponse.json({
    success: true,
    message: 'Upload received'
  });

  // Queue blob upload after response (Node.js event loop pattern)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const uploadedAt = new Date().toISOString();
    const timestamp = uploadedAt.replace(/[:.]/g, '-');
    const uuid = crypto.randomUUID();
    const pathname = `uploads/${timestamp}-${uuid}.csv`;

    // This executes asynchronously without blocking the response
    setImmediate(async () => {
      try {
        await put(pathname, file, {
          access: 'public',
          addRandomSuffix: false,
          contentType: file.type || 'text/csv'
        });

        console.log(`Background upload completed: ${pathname}`);
      } catch (err) {
        console.error('Background blob upload failed:', err);
      }
    });
  }

  return response;
}
