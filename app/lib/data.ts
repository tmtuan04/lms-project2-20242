"use server";

import sql from "./db";
import {
  CourseCardProps,
  CourseWithLessons,
  Lesson,
  Category,
} from "./definitions";

// Check isInstructor
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

// Các hàm khác giữ nguyên...

// Sửa lại hàm fetchCourseById
export async function fetchCourseById(courseId: string) {
  try {
    // Debug log
    // console.log("Fetching course with ID:", courseId);

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

    // Debug log
    // console.log("Found course:", course);

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
