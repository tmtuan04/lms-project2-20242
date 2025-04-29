import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("Unauthorized");
  return { userId: user.id };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
    }),
    
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
    }),
    
  chapterVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 