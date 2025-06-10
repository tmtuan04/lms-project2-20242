"use client";

import { useUserStore } from "@/app/stores/useUserStore";
import { useEffect, useState } from "react";
import { checkUserEnrolled } from "@/app/lib/data";
import { toggleChapterProgress, getChapterProgress } from "@/app/lib/actions/chapterProgressActions";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { useProgressStore } from "@/app/stores/useProgressStore";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Skeleton } from "@/components/ui/skeleton";

type Attachment = {
  id: string;
  name: string;
  url: string;
};

type ChapterType = {
  id: string;
  title: string;
  description?: string | undefined;
  videoUrl: string | null;
  isLocked: boolean;
  attachments: Attachment[] | null;
};

interface ChapterContentProps {
  chapter: ChapterType;
  courseId: string;
  courseChapters: ChapterType[];
}

export default function ChapterContent({ chapter, courseId, courseChapters }: ChapterContentProps) {
  const { user } = useUserStore();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChapterLoading, setIsChapterLoading] = useState(true); // Loading cho toàn bộ Chapter
  const setCompletedInStore = useProgressStore((state) => state.setCompleted);

  useEffect(() => {
    if (!user?.id) return;
  
    setIsChapterLoading(true); // Bắt đầu loading
  
    const loadData = async () => {
      const enrolled = await checkUserEnrolled(courseId, user.id);
      setIsEnrolled(enrolled);
  
      const progress = await getChapterProgress(chapter.id, user.id);
      setIsCompleted(progress?.isCompleted ?? false);
  
      setIsChapterLoading(false); // Kết thúc loading sau khi fetch xong
    };
  
    loadData();
  }, [user?.id, courseId, chapter.id]);

  // Hàm kiểm tra tất cả các chapter đã hoàn thành chưa
  const checkAllChaptersCompleted = async () => {
    if (!user?.id) return false;

    const progressList = await Promise.all(
      courseChapters.map((chap) => getChapterProgress(chap.id, user.id))
    );

    // Nếu tất cả đều completed thì return true
    return progressList.every((progress) => progress?.isCompleted);
  };

  const handleToggleComplete = async () => {
    if (!user?.id) {
      toast.error("Please login to mark chapters as complete");
      return;
    }

    try {
      setIsLoading(true);
      const progress = await toggleChapterProgress(chapter.id, user.id);
      setIsCompleted(progress.isCompleted);
      setCompletedInStore(chapter.id, progress.isCompleted);
      toast.success(progress.isCompleted ? "Chapter marked as complete!" : "Chapter marked as incomplete");

      if (progress.isCompleted) {
        const allCompleted = await checkAllChaptersCompleted();
        if (allCompleted) {
          // Bắn pháo hoa chúc mừng
          function bigCelebration() {
            let count = 0;
            const maxCount = 6;
            const interval = 350;

            const timer = setInterval(() => {
              confetti({
                particleCount: 150,
                spread: 100,
                origin: { x: Math.random(), y: Math.random() * 0.6 + 0.2 },
                gravity: 0.8,
                ticks: 300
              });
              count++;
              if (count >= maxCount) {
                clearInterval(timer);
              }
            }, interval);
          }

          bigCelebration();
          toast.success("Congrats! You've finished the course!", { duration: 5000, position: "bottom-center" });
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update progress");
    } finally {
      setIsLoading(false);
    }
  };

  // Nếu đã mua thì mở khóa hết
  const chapterIsLocked = chapter.isLocked && !isEnrolled;

  if (chapterIsLocked) {
    return (
      <div className="aspect-video bg-slate-200 flex justify-center items-center rounded-md">
        <p className="text-slate-600 font-bold">This chapter is locked.</p>
      </div>
    );
  }

  if (isChapterLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="aspect-video w-full rounded-md" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {chapter.videoUrl && (
        <div className="aspect-video">
          <video
            src={chapter.videoUrl}
            controls
            className="w-full h-full rounded-md object-cover"
          />
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-xl font-bold">{chapter.title}</h2>
        {isEnrolled && (
          <Button
            onClick={handleToggleComplete}
            disabled={isLoading}
            className={`flex items-center gap-2 ${isCompleted
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-secondary text-black hover:bg-secondary/80"
              }`}
          >
            <CheckCircle2 className={isCompleted ? "text-white" : "text-green-600"} />
            {isCompleted ? "Completed" : "Mark as Complete"}
          </Button>
        )}
      </div>
      <p className="text-slate-600 mt-2">{chapter.description}</p>
      {chapter.attachments && chapter.attachments.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Attachments:</h3>
          <ul className="space-y-2">
            {chapter.attachments?.map((file, index) =>
              file.url.endsWith('.pdf') ? (
                <div key={file.id} className="mt-6 border rounded-md overflow-hidden h-[600px]">
                  <h4 className="font-semibold m-2">{index}. {file.name}</h4>
                  <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={file.url} />
                  </Worker>
                </div>
              ) : (
                <p key={file.id}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {file.name}
                  </a>
                </p>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}