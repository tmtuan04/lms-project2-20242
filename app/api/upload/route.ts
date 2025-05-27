import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(request: Request) {
  try {

    // Parse body kiểu multipart/form-data và lấy file theo key "file"
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64
    const base64String = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        {
          resource_type: "auto", // Automatically detect if it's an image or video
          folder: "lms-uploads",
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
