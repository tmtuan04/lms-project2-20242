"use server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/app/lib/cloudinary";

const prisma = new PrismaClient();

export async function deleteDocument(id: string) {
  try {
    const { result } = await cloudinary.uploader.destroy(id);
    return result;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
}

export async function deleteDocumentFromDB(id: string) {
  try {
    const document = await prisma.chapterAttachment.delete({
      where: {
        id,
      },
    });
    return document;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
}

/*
model ChapterAttachment {
  id   String @id @default(uuid())
  name String
  url  String @db.Text

  chapterId String
  chapter   Chapter @relation(fields: [chapterId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([chapterId])
}
*/