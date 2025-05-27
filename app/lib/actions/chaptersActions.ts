"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateChapter({
  chapterId,
  title,
  description,
  videoUrl,
  attachments,
  isLocked,
  courseId,
}: {
  chapterId: string;
  title: string;
  description: string;
  videoUrl: string;
  attachments: string[];
  isLocked: boolean;
  courseId: string;
}) {
  try {
    if (
      !chapterId ||
      !title ||
      !description ||
      !videoUrl ||
      !attachments ||
      !isLocked ||
      !courseId
    ) {
      throw new Error("Missing required fields");
    }

    const chapter = await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        title,
        description,
        videoUrl,
        attachments: {
          create: attachments.map((url) => ({
            name: url.split("/").pop() || "Attachment",
            url,
          })),
        },
        isLocked,
      },
      include: {
        attachments: true,
      },
    });

    return chapter;
  } catch (error) {
    console.log("Failed to update chapter:", error);
  }
}
