"use client";

import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useRouter } from "next/navigation";

interface UploadVideoFormProps {
  chapterId: string;
  courseId: string;
}

export default function UploadVideoForm({ chapterId, courseId }: UploadVideoFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const onUploadComplete = async (res: { url: string; name: string }[]) => {
    try {
      const response = await fetch(`/api/chapters/${chapterId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoUrl: res[0].url
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update chapter');
      }

      router.refresh();
    } catch (error) {
      console.error('Error updating chapter:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 bg-slate-100 rounded-md">
      <h3 className="text-lg font-semibold mb-4">Upload Video</h3>
      <UploadDropzone<OurFileRouter, "chapterVideo">
        endpoint="chapterVideo"
        onUploadBegin={() => setIsUploading(true)}
        onClientUploadComplete={onUploadComplete}
        onUploadError={(error: Error) => {
          console.log(`ERROR: ${error.message}`);
          setIsUploading(false);
        }}
      />
      {isUploading && (
        <div className="mt-4 text-sm text-blue-500">
          Uploading video...
        </div>
      )}
    </div>
  );
} 