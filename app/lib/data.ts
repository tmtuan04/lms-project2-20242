"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import sql from "./db";
import {
  CourseCardProps,
  CourseWithLessons,
  Lesson,
  Category,
  UserCourseCardProps,
  CourseTableData,
  CourseTableDataBasic,
  Customer,
  RevenueChartData,
} from "./definitions";

export async function checkUserEnrolled(
  courseId: string,
  userId: string
): Promise<boolean> {
  const enrollment = await prisma.courseEnrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  return !!enrollment;
}
// Get Chapter by ID Chapter
export async function getChapterByID(id: string) {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: { id },
      include: {
        course: {
          select: { title: true, isPublished: true },
        },
        attachments: {
          select: {
            id: true,
            name: true,
            url: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!chapter) {
      throw new Error(`Chapter with ID ${id} not found`);
    }

    return {
      id: chapter.id,
      title: chapter.title,
      description: chapter.description ?? "",
      videoUrl: chapter.videoUrl ?? "",
      isLocked: chapter.isLocked,
      courseId: chapter.courseId,
      courseName: chapter.course.title,
      isPublished: chapter.course.isPublished,
      attachments: chapter.attachments,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching chapter by ID:", error);
    throw new Error("Failed to fetch chapter by ID");
  }
}

// Get Course by ID Course
export async function getCourseByID(id: string): Promise<CourseTableDataBasic> {
  try {
    const result = await sql<
      {
        id: string;
        title: string;
        price: number;
        description: string;
        imageUrl: string;
        isPublished: boolean;
        categoryId: string;
        instructorId: string;
        chapters: {
          id: string;
          title: string;
        }[];
      }[]
    >`
      SELECT 
        c.id, 
        c.title, 
        c.price, 
        c.description, 
        c."imageUrl", 
        c."categoryId", 
        c."instructorId",
        c."isPublished",
        COALESCE(
          json_agg(
            json_build_object(
              'id', ch.id,
              'title', ch.title
            )
          ) FILTER (WHERE ch.id IS NOT NULL),
          '[]'
        ) as chapters
      FROM "Course" c
      LEFT JOIN "Chapter" ch ON ch."courseId" = c.id
      WHERE c.id = ${id}
      GROUP BY c.id, c.title, c.price, c.description, c."imageUrl", c."categoryId", c."instructorId"
    `;

    if (result.length === 0) {
      throw new Error(`Course with ID ${id} not found`);
    }

    const course = result[0];

    return {
      id: course.id,
      title: course.title,
      price: course.price,
      description: course.description,
      imageUrl: course.imageUrl,
      categoryId: course.categoryId,
      instructorId: course.instructorId,
      isPublished: course.isPublished,
      chapters: course.chapters,
    };
  } catch (error) {
    console.error("Error fetching course by id:", error);
    throw new Error("Failed to fetch course by ID");
  }
}

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

//--------------Fetch data cho analytics------------------
// 4 card
export async function fetchCardAnalys(instructorId: string) {
  try {
    const courseCountPromise = sql`SELECT COUNT(*)
      FROM "Course" c
      WHERE c."instructorId" = ${instructorId}
    `;
    const customerCountPromise = sql`SELECT COUNT(DISTINCT p."userId")
      FROM "Course" c
      JOIN "Payment" p ON c.id = p."courseId"
      WHERE c."instructorId" = ${instructorId}
    `;
    const invoiceCountPromise = sql`SELECT COUNT(*)
      FROM "Course" c
      JOIN "Payment" p ON c.id = p."courseId"
      WHERE c."instructorId" = ${instructorId}
    `;
    const totalPaidInvoicesPromise = sql`
      SELECT SUM(p."amount" ::NUMERIC) as total
      FROM "Course" c
      JOIN "Payment" p ON c.id = p."courseId"
      WHERE c."instructorId" = ${instructorId} and p."status" = 'SUCCESS'
    `;
    //Fetch theo CourseEnrollment
    // const customerCountPromise = sql`
    //   SELECT COUNT(DISTINCT ce."userId")
    //   FROM "Course" c
    //   JOIN "CourseEnrollment" ce ON c.id = ce."courseId"
    //   WHERE c."instructorId" = ${instructorId}
    // `;

    const [
      courseCountResult,
      customerCountResult,
      invoiceCountResult,
      totalPaidInvoicesResult,
    ] = await Promise.all([
      courseCountPromise,
      customerCountPromise,
      invoiceCountPromise,
      totalPaidInvoicesPromise,
    ]);

    const courseCount = Number(courseCountResult[0]?.count ?? "0");
    const customerCount = Number(customerCountResult[0]?.count ?? "0");
    const invoiceCount = Number(invoiceCountResult[0]?.count ?? "0");
    const totalPaidInvoices = Number(totalPaidInvoicesResult[0]?.total ?? "0");

    return {
      customerCount,
      courseCount,
      invoiceCount,
      totalPaidInvoices,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch by instructor");
  }
}

// Recent customers: 4 customer co payment moi nhat
export async function getRecentCustomer(
  instructorId: string
): Promise<Customer[]> {
  try {
    const data = await sql<
      {
        id: string;
        name: string;
        email: string;
        image_url: string;
        amount: number;
        course_title: string;
      }[]
    >`
      SELECT u.id, u.name, u.email, u."imageUrl" AS image_url, p."amount"::NUMERIC, c."title" AS course_title
      FROM "Payment" p
      JOIN "User" u ON p."userId" = u.id
      JOIN "Course" c ON p."courseId" = c.id
      WHERE p."status" = 'SUCCESS' and  c."instructorId" = ${instructorId}
      ORDER BY p."updatedAt" DESC
      LIMIT 4
    `;

    return data.map(
      (row: {
        id: string;
        name: string;
        email: string;
        image_url: string;
        amount: number;
        course_title: string;
      }) => ({
        id: row.id,
        name: row.name || "Anomymous",
        amount: row.amount || 0,
        email: row.email || "",
        course_title: row.course_title || "",
        image_url:
          row.image_url ||
          "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?uid=R122875801&ga=GA1.1.1700211466.1746505583&semt=ais_hybrid&w=740",
      })
    );
  } catch (error) {
    console.error("Error fetch recent customers:", error);
    throw new Error("Failed to fetch recent customers");
  }
}

//Chart revenue
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export async function getRevenueData(
  instructorId: string
): Promise<RevenueChartData[]> {
  try {
    const data = await sql<
      { month: string; revenue: number }[]
    >`WITH months AS (
        SELECT to_char(generate_series(1, extract(month from CURRENT_DATE)::int), 'FM00') AS month
      )
      SELECT
        m.month,
        COALESCE(SUM(
          CASE
            WHEN p."status" = 'SUCCESS' AND c."instructorId" = ${instructorId}
            THEN p."amount"::NUMERIC
            ELSE 0
          END
        ), 0) AS revenue
      FROM months m
      LEFT JOIN "Payment" p ON to_char(p."updatedAt", 'MM') = m.month
      LEFT JOIN "Course" c ON c.id = p."courseId"
      GROUP BY m.month
      ORDER BY m.month;
      `;
    return data.map((row: { month: string; revenue: number }) => ({
      month: MONTHS[parseInt(row.month, 10) - 1],
      venenue: Number(row.revenue),
    }));
  } catch (error) {
    console.log("Error from fetch Revenue Chart:", error);
    throw new Error("Failes to fetch revenue chart data");
  }
}
//------------------------------------------------------

export async function getInitUserCourseCards(
  userId: string
): Promise<UserCourseCardProps[]> {
  try {
    const data = await sql<UserCourseCardProps[]>`
      SELECT 
        c.id AS id,
        c.title,
        u.name AS instructor,
        cat.name AS category,
        c."imageUrl" AS "imageUrl",
        COUNT(DISTINCT ch.id) AS "chaptersCount",
        COUNT(DISTINCT CASE 
          WHEN cp."isCompleted" = true  THEN ch.id 
          END) AS "completedChaptersCount"
      FROM "CourseEnrollment" ce
      JOIN "Course" c ON ce."courseId" = c.id
      JOIN "User" u ON c."instructorId" = u.id
      JOIN "Category" cat ON c."categoryId" = cat.id
      LEFT JOIN "Chapter" ch ON ch."courseId" = c.id
      LEFT JOIN "ChapterProgress" cp ON cp."chapterId" = ch.id AND cp."userId" = ce."userId"
      WHERE ce."userId" = ${userId}
      GROUP BY c.id, c.title, u.name, cat.name, c."imageUrl";
        `;
    return data.map(
      (row: {
        id: string;
        instructor: string;
        title: string;
        category: string;
        chaptersCount: number;
        completedChaptersCount: number;
        imageUrl: string;
      }) => ({
        id: row.id,
        instructor: row.instructor || "Unknown Instructor",
        title: row.title || "Untitled Course",
        category: row.category || "Unknown Category",
        chaptersCount: row.chaptersCount || 0,
        completedChaptersCount: row.completedChaptersCount || 0,
        imageUrl:
          row.imageUrl ||
          "https://img.freepik.com/premium-vector/print_1126632-1359.jpg?uid=R122875801&ga=GA1.1.1700211466.1746505583&semt=ais_items_boosted&w=740",
      })
    );
  } catch (error) {
    console.log("Error from fetch Course Dashboard:", error);
    throw new Error("Failes to fetch user course cards");
  }
  // return [
  //   {
  //     id: "course-001",
  //     instructor: "Nguyễn Văn A",
  //     title: "Lập trình React cơ bản",
  //     category: "Lập trình web",
  //     chaptersCount: 16,
  //     completedChaptersCount: 0,
  //     imageUrl:
  //       "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
  //   },
  //   {
  //     id: "course-002",
  //     instructor: "Trần Thị B",
  //     title: "Thiết kế UI/UX chuyên sâu",
  //     category: "Thiết kế",
  //     chaptersCount: 12,
  //     completedChaptersCount: 5,
  //     imageUrl:
  //       "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
  //   },
  //   {
  //     id: "course-003",
  //     instructor: "Lê Văn C",
  //     title: "Python cho người mới bắt đầu",
  //     category: "Lập trình",
  //     chaptersCount: 20,
  //     completedChaptersCount: 20,
  //     imageUrl:
  //       "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
  //   },
  //   {
  //     id: "course-004",
  //     instructor: "Lê Văn C",
  //     title: "Python cho người mới bắt đầu",
  //     category: "Lập trình",
  //     chaptersCount: 20,
  //     completedChaptersCount: 20,
  //     imageUrl:
  //       "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
  //   },
  //   {
  //     id: "course-005",
  //     instructor: "Lê Văn C",
  //     title: "Python cho người mới bắt đầu",
  //     category: "Lập trình",
  //     chaptersCount: 20,
  //     completedChaptersCount: 20,
  //     imageUrl:
  //       "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826",
  //   },
  // ];
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
              'isLocked', ch."isLocked",
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
