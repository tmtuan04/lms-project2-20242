import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// Validate đầu vào cơ bản
const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0),
});
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Log
    console.log(body);

    const parsed = courseSchema.parse(body);

    const newCourse = await prisma.course.create({
      data: {
        instructorId: body.instructorId,
        title: parsed.title,
        price: parsed.price,
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Create Course Error:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const course = await prisma.course.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("Delete Course Error:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
