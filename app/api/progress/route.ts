import { NextRequest, NextResponse } from 'next/server';
import { getChapterProgress } from '@/app/lib/actions/chapterProgressActions';

export async function GET(req: NextRequest) {
  const chapterId = req.nextUrl.searchParams.get('chapterId');
  const userId = req.nextUrl.searchParams.get('userId');

  if (!chapterId || !userId) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  try {
    const progress = await getChapterProgress(chapterId, userId);
    return NextResponse.json({ isCompleted: progress?.isCompleted || false });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}