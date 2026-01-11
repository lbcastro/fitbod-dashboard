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

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Blob storage is not configured.' }, { status: 500 });
  }

  const uploadedAt = new Date().toISOString();
  const timestamp = uploadedAt.replace(/[:.]/g, '-');
  const uuid = crypto.randomUUID();
  const pathname = `uploads/${timestamp}-${uuid}.csv`;

  const { url } = await put(pathname, file, {
    access: 'public',
    addRandomSuffix: false,
    contentType: file.type || 'text/csv'
  });

  return NextResponse.json({
    url,
    pathname,
    uuid,
    uploadedAt
  });
}
