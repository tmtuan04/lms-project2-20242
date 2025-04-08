import postgres from "postgres";
import { CourseCardProps } from "./definitions";

// Viết SQL ở đây

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const fetchCourses = async () => {
  try {
    const data = await sql<CourseCardProps[]>`
    SELECT "Course".id, "Course"."courseUrl", "Course".title, "Category".name AS category, "Course".chapter, "Course".price, "Course"."imageUrl", "User".name as instructor
    FROM "Course" 
    JOIN "Category" ON "Category".id = "Course"."categoryId"
    JOIN "User" ON "Course"."instructorId" = "User".id
  `;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch courses data.");
  }
};
