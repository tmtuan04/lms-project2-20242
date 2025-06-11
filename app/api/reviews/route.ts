import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Submit or update a review
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, courseId, rating, comment } = body;

    if (!userId || !courseId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Invalid review data" },
        { status: 400 }
      );
    }

    // Check if user has already reviewed this course
    const existingReview = await prisma.courseReview.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    if (existingReview) {
      // Update existing review
      const updatedReview = await prisma.courseReview.update({
        where: {
          id: existingReview.id,
        },
        data: {
          rating,
          comment,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        message: "Review updated successfully",
        review: updatedReview,
      });
    }

    // Create new review
    const review = await prisma.courseReview.create({
      data: {
        userId,
        courseId,
        rating,
        comment,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("[REVIEWS_POST]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Get reviews for a course
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { success: false, message: "Course ID is required" },
        { status: 400 }
      );
    }

    const reviews = await prisma.courseReview.findMany({
      where: {
        courseId,
      },
      include: {
        user: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("[REVIEWS_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}