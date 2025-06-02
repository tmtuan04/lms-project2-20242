"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function toggleChapterProgress(chapterId: string, userId: string) {
  try {
    // Check if progress record exists
    const existingProgress = await prisma.chapterProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    if (existingProgress) {
      // Toggle completion status
      const updatedProgress = await prisma.chapterProgress.update({
        where: {
          id: existingProgress.id,
        },
        data: {
          isCompleted: !existingProgress.isCompleted,
          completedAt: !existingProgress.isCompleted ? new Date() : null,
        },
      });
      return updatedProgress;
    } else {
      // Create new progress record
      const newProgress = await prisma.chapterProgress.create({
        data: {
          userId,
          chapterId,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
      return newProgress;
    }
  } catch (error) {
    console.error("Error updating chapter progress:", error);
    throw new Error("Failed to update chapter progress");
  }
}

export async function getChapterProgress(chapterId: string, userId: string) {
  try {
    const progress = await prisma.chapterProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });
    return progress;
  } catch (error) {
    console.error("Error fetching chapter progress:", error);
    throw new Error("Failed to fetch chapter progress");
  }
} 