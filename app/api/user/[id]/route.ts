
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
) {
  const id = req.nextUrl.pathname.split("/").pop(); // lấy id từ đường dẫn
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      isInstructor: user.isInstructor,
    })

  } catch (error) {
    console.log("Error in GET user:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
