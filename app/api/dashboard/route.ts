import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get total number of courses
    const totalCourses = await prisma.course.count();
    
    // Get total number of users
    const totalUsers = await prisma.user.count();
    
    // Get total number of instructors
    const totalInstructors = await prisma.user.count({
      where: { isInstructor: true }
    });
    
    // Get total number of enrollments
    const totalEnrollments = await prisma.courseEnrollment.count();
    
    // Get courses by category
    const coursesByCategory = await prisma.category.findMany({
      select: {
        name: true,
        _count: {
          select: { courses: true }
        }
      }
    });
    
    // Get top 5 courses by enrollment
    const topCourses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: { enrollments: true }
        }
      },
      orderBy: {
        enrollments: {
          _count: 'desc'
        }
      },
      take: 5
    });
    
    // Get recent enrollments
    const recentEnrollments = await prisma.courseEnrollment.findMany({
      select: {
        createdAt: true,
        course: {
          select: {
            title: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    return NextResponse.json({
      stats: {
        totalCourses,
        totalUsers,
        totalInstructors,
        totalEnrollments
      },
      coursesByCategory,
      topCourses,
      recentEnrollments
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
} 