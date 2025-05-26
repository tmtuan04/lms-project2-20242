"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCourse({
  title,
  description,
  imageUrl,
  price,
  categoryId,
  chapters, // string[] chỉ chứa title
  instructorId,
}: {
  title: string;
  description: string;
  imageUrl: string;
  chapters: string[]; // danh sách title
  price: number | string;
  categoryId: string;
  instructorId: string;
}) {
  if (
    !title ||
    !description ||
    !imageUrl ||
    !price ||
    !categoryId ||
    !chapters ||
    !instructorId
  ) {
    throw new Error("Missing required fields");
  }

  const course = await prisma.course.create({
    data: {
      title,
      description,
      imageUrl,
      price: typeof price === "string" ? parseFloat(price) : price,
      categoryId,
      instructorId,
      chapters: {
        create: chapters.map((chapterTitle) => ({
          title: chapterTitle,
        })),
      },
    },
    include: {
      chapters: true, // Optional: trả về luôn danh sách chương
    },
  });

  return course;
}

export async function updateCourse({
  courseId,
  title,
  description,
  imageUrl,
  price,
  categoryId,
  chapters, // string[] chỉ chứa title
  instructorId,
}: {
  courseId: string;
  title: string;
  description: string;
  imageUrl: string;
  chapters: string[]; // danh sách title
  price: number | string;
  categoryId: string;
  instructorId: string;
}) {
  if (
    !courseId ||
    !title ||
    !description ||
    !imageUrl ||
    !price ||
    !categoryId ||
    !chapters ||
    !instructorId
  ) {
    throw new Error("Missing required fields");
  }

  // Xóa tất cả chapters cũ
  await prisma.chapter.deleteMany({
    where: {
      courseId: courseId
    }
  });

  // Cập nhật course và tạo chapters mới
  const course = await prisma.course.update({
    where: {
      id: courseId
    },
    data: {
      title,
      description,
      imageUrl,
      price: typeof price === "string" ? parseFloat(price) : price,
      categoryId,
      instructorId,
      chapters: {
        create: chapters.map((chapterTitle) => ({
          title: chapterTitle,
        })),
      },
    },
    include: {
      chapters: true,
    },
  });

  return course;
}