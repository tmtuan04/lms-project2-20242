import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

// Tăng timeout limit cho API route
export const maxDuration = 60; // Limit từ Vercel
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const originalName = file.name;
    const fileSize = file.size;
    const isLargeFile = fileSize > 100 * 1024 * 1024; // 100MB

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64
    const base64String = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary with different options based on file size
    const result = await new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: "auto" as const,
        folder: "lms-uploads",
        public_id: originalName.replace(/\.[^/.]+$/, ""),
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        chunk_size: isLargeFile ? 6000000 : undefined, // 6MB chunks for large files
        timeout: 300000, // 5 phút timeout
      };

      // Sử dụng upload_large cho file lớn
      const uploadMethod = isLargeFile ? cloudinary.uploader.upload_large : cloudinary.uploader.upload;

      uploadMethod(
        dataURI,
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          }
          resolve(result);
        }
      );
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error uploading file. Please try again or use a smaller file." },
      { status: 500 }
    );
  }
}