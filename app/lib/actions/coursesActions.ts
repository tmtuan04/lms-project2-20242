"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCourse({
  title,
  description,
  imageUrl,
  price,
  categoryId,
  chapters,
  instructorId,
}: {
  title: string;
  description: string;
  imageUrl: string;
  chapters: string[];
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

  // 1. Tạo course trước (chưa có courseUrl)
  const createdCourse = await prisma.course.create({
    data: {
      title,
      description,
      imageUrl,
      price: typeof price === "string" ? parseFloat(price) : price,
      categoryId,
      instructorId,
      chapters: {
        create: chapters.map((chapterTitle, index) => ({
          title: chapterTitle,
          order: index,
        })),
      },
    },
  });

  // 2. Update lại courseUrl với id vừa tạo
  const updatedCourse = await prisma.course.update({
    where: { id: createdCourse.id },
    data: {
      courseUrl: `/course/${createdCourse.id}`,
    },
    include: {
      chapters: true,
    },
  });

  return updatedCourse;
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
      courseId: courseId,
    },
  });

  // Cập nhật course và tạo chapters mới
  const course = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      title,
      description,
      imageUrl,
      price: typeof price === "string" ? parseFloat(price) : price,
      categoryId,
      instructorId,
      chapters: {
        create: chapters.map((chapterTitle, index) => ({
          title: chapterTitle,
          order: index,
        })),
      },
    },
    include: {
      chapters: true,
    },
  });

  return course;
}

export async function publishCourse({ courseId }: { courseId: string }) {
  if (!courseId) {
    throw new Error("Missing courseId");
  }

  // Cập nhật trạng thái isPublished thành true
  const course = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      isPublished: true,
    },
  });

  return course;
}
