import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {

  const courseId = request.nextUrl.pathname.split("/").pop();

  if (!courseId) {
    return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: true,
        instructor: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        chapters: true,
        enrollments: true,
        courseReviews: {
          include: {
            user: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const responseData = {
      id: course.id,
      title: course.title ?? "",
      category: course.category?.name ?? "",
      description: course.description ?? "",
      instructorId: course.instructor.id,
      instructor: {
        name: course.instructor.name ?? "",
        imageUrl: course.instructor.imageUrl ?? "",
      },
      enrolled: course.enrollments.length.toString(),
      chapters: course.chapters.length.toString(),
      rating: (
        course.courseReviews.reduce((acc, cur) => acc + cur.rating, 0) /
        (course.courseReviews.length || 1)
      ).toFixed(1),
      reviews: course.courseReviews.length.toString(),
      imageUrl: course.imageUrl ?? "",
      createdAt: course.createdAt.toISOString(),
      courseReviews: course.courseReviews.map((review) => ({
        id: review.id,
        user: {
          name: review.user.name ?? "",
          imageUrl: review.user.imageUrl ?? "",
        },
        rating: review.rating,
        comment: review.comment,
        timestamp: review.createdAt.toISOString(),
        likes: 0,
        comments: [],
      })),
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}