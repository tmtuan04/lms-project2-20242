"use server";

import sql from "./db";
import {
  CourseCardProps,
  CourseWithLessons,
  Lesson,
  Category,
  UserCourseCardProps,
  CourseTableData,
} from "./definitions";

// List courses mà mình là instructor
export async function getCoursesByInstructor(
  instructorId: string
): Promise<CourseTableData[]> {
  try {
    const data = await sql<
      { id: string; title: string; price: number; isPublished: boolean }[]
    >`
      SELECT id, title, price, c."isPublished", c."createdAt"
      FROM "Course" c
      WHERE c."instructorId" = ${instructorId}
      ORDER BY c."createdAt" DESC
    `;

    return data.map(
      (row: {
        id: string;
        title: string;
        price: number;
        isPublished: boolean;
      }) => ({
        id: row.id,
        title: row.title || "Untitled Course",
        price: row.price || 0,
        status: row.isPublished ? "Published" : "Draft",
      })
    );
  } catch (error) {
    console.error("Error fetch courses by instructor:", error);
    throw new Error("Failed to fetch courses by instructor");
  }
}

export async function getInitUserCourseCards(): Promise<UserCourseCardProps[]> {
  return [
    {
      id: "course-001",
      instructor: "Nguyễn Văn A",
      title: "Lập trình React cơ bản",
      category: "Lập trình web",
      chaptersCount: 16,
      completedChaptersCount: 0,
      imageUrl:
        "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
    },
    {
      id: "course-002",
      instructor: "Trần Thị B",
      title: "Thiết kế UI/UX chuyên sâu",
      category: "Thiết kế",
      chaptersCount: 12,
      completedChaptersCount: 5,
      imageUrl:
        "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
    },
    {
      id: "course-003",
      instructor: "Lê Văn C",
      title: "Python cho người mới bắt đầu",
      category: "Lập trình",
      chaptersCount: 20,
      completedChaptersCount: 20,
      imageUrl:
        "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
    },
    {
      id: "course-004",
      instructor: "Lê Văn C",
      title: "Python cho người mới bắt đầu",
      category: "Lập trình",
      chaptersCount: 20,
      completedChaptersCount: 20,
      imageUrl:
        "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
    },
    {
      id: "course-005",
      instructor: "Lê Văn C",
      title: "Python cho người mới bắt đầu",
      category: "Lập trình",
      chaptersCount: 20,
      completedChaptersCount: 20,
      imageUrl:
        "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
    },
  ];
}

// Check isInstructor - Sau bỏ cái này đi
export const checkIsInstructor = async (userId: string) => {
  try {
    const data = await sql<{ isInstructor: boolean }[]>`
      SELECT 
        u."isInstructor" 
      FROM "User" u
      WHERE u.id = ${userId}
    `;

    if (data.length === 0) {
      return false;
    }

    return data[0].isInstructor;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to check instructor status.");
  }
};

// Lấy danh sách các category
export const fetchCategories = async () => {
  try {
    const data = await sql<Category[]>`
    SELECT id, name FROM "Category"
    ORDER BY "name" DESC
  `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categories data.");
  }
};

// Danh sách tất cả khóa học
export const fetchCourses = async (query?: string) => {
  try {
    const data = await sql<CourseCardProps[]>`
      SELECT 
        c.id, 
        c."courseUrl", 
        c.title, 
        cat.name AS category, 
        COUNT(ch.id) as "chaptersCount",  -- Đếm số lượng chapters
        c.price, 
        c."imageUrl", 
        u.name as instructor
      FROM "Course" c 
      JOIN "Category" cat ON cat.id = c."categoryId"
      JOIN "User" u ON c."instructorId" = u.id
      LEFT JOIN "Chapter" ch ON ch."courseId" = c.id  -- Join với bảng Chapter
      WHERE 
        c."isPublished" = true
        ${
          query
            ? sql`AND (
          LOWER(c.title) LIKE ${`%${query.toLowerCase()}%`} OR
          LOWER(u.name) LIKE ${`%${query.toLowerCase()}%`} OR
          LOWER(cat.name) LIKE ${`%${query.toLowerCase()}%`}
        )`
            : sql``
        }
      GROUP BY c.id, c."courseUrl", c.title, cat.name, c.price, c."imageUrl", u.name
      ORDER BY c."createdAt" DESC
    `;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch courses data.");
  }
};

// fetchCourseById
export async function fetchCourseById(courseId: string) {
  try {
    const course = await sql<CourseWithLessons[]>`
      SELECT 
        c.id,
        c.title,
        COALESCE(c.description, '') as description,
        COALESCE(c.price, 0) as price,
        COUNT(ch.id) as "chaptersCount",
        COALESCE(c."imageUrl", '') as "imageUrl",
        COALESCE(u.name, 'Unknown') as instructor,
        COALESCE(
          json_agg(
            json_build_object(
              'id', ch.id,
              'title', ch.title,
              'description', ch.description,
              'videoUrl', ch."videoUrl",
              'attachments', (
                SELECT json_agg(
                  json_build_object(
                    'id', ca.id,
                    'name', ca.name,
                    'url', ca.url
                  )
                )
                FROM "ChapterAttachment" ca
                WHERE ca."chapterId" = ch.id
              )
            )
          ) FILTER (WHERE ch.id IS NOT NULL),
          '[]'
        ) as chapters
      FROM "Course" c
      LEFT JOIN "User" u ON c."instructorId" = u.id
      LEFT JOIN "Chapter" ch ON ch."courseId" = c.id
      WHERE c.id = ${courseId}
      GROUP BY c.id, c.title, c.description, c.price, c."imageUrl", u.name
    `;

    if (!course || course.length === 0) {
      console.log("No course found");
      return null;
    }

    return course[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch course");
  }
}

// Sửa lại fetchLessonById thành fetchChapterById
export async function fetchChapterById(chapterId: string) {
  try {
    const chapter = await sql<Lesson[]>`
      SELECT 
        ch.id,
        ch.title,
        ch.description,
        ch."videoUrl",
        c.title as "courseName",
        c.id as "courseId",
        true as "isLocked"
      FROM "Chapter" ch
      JOIN "Course" c ON ch."courseId" = c.id
      WHERE ch.id = ${chapterId}
    `;
    return chapter[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch chapter");
  }
}

// Kiểm tra trạng thái mua khóa học của người dùng
type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export async function checkUserCourseAccess(
  userId: string,
  courseId: string
): Promise<{
  hasAccess: boolean;
  isEnrolled: boolean;
  paymentStatus?: PaymentStatus;
}> {
  try {
    // Kiểm tra enrollment
    const enrollment = await sql<{ id: string }[]>`
      SELECT id 
      FROM "CourseEnrollment"
      WHERE "userId" = ${userId} 
      AND "courseId" = ${courseId}
    `;

    // Kiểm tra payment status
    const payment = await sql<{ status: PaymentStatus }[]>`
      SELECT status
      FROM "Payment"
      WHERE "userId" = ${userId}
      AND "courseId" = ${courseId}
      ORDER BY "createdAt" DESC
      LIMIT 1
    `;

    return {
      hasAccess:
        enrollment.length > 0 &&
        payment.length > 0 &&
        payment[0].status === "SUCCESS",
      isEnrolled: enrollment.length > 0,
      paymentStatus: payment[0]?.status,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to check user course access");
  }
}
