import { NextResponse } from "next/server";
import { checkUserEnrolled } from "@/app/lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const userId = searchParams.get("userId");

  if (!courseId || !userId) {
    return NextResponse.json({ isEnrolled: false });
  }

  const isEnrolled = await checkUserEnrolled(courseId, userId);
  return NextResponse.json({ isEnrolled });
}