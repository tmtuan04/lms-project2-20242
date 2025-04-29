import { NextResponse } from "next/server";
import sql from "@/app/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { videoUrl } = await req.json();
    const { chapterId } = params;

    await sql`
      UPDATE "Chapter"
      SET "videoUrl" = ${videoUrl}
      WHERE id = ${chapterId}
    `;

    return NextResponse.json({ message: "Chapter updated successfully" });
  } catch (error) {
    console.error("[CHAPTER_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 