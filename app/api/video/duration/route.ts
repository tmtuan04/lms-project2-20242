import { NextResponse } from 'next/server';
import { getVideoMetadata } from '@/app/lib/cloudAction';

export async function GET(request: Request) {
  try {
    // Get the publicId from the URL search params
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Get video duration using the existing function
    const duration = await getVideoMetadata(publicId);

    return NextResponse.json({ duration });
  } catch (error) {
    console.error('Error getting video duration:', error);
    return NextResponse.json(
      { error: 'Failed to get video duration' },
      { status: 500 }
    );
  }
} 