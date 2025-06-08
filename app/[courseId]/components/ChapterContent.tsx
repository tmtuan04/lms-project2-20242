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
  const setCompletedInStore = useProgressStore((state) => state.setCompleted);


  useEffect(() => {
    if (user?.id) {
      checkUserEnrolled(courseId, user.id).then(setIsEnrolled);
      // Fetch initial completion status
      getChapterProgress(chapter.id, user.id).then((progress) => {
        setIsCompleted(progress?.isCompleted ?? false);
      });
    }
  }, [user, courseId, chapter.id]);

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
          toast.success("Congrats! You've finished the course!", { duration: 5000, position: "bottom-center"});
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

  return (
    <div>
      <div className="aspect-video">
        {chapter.videoUrl ? (
          <video
            src={chapter.videoUrl}
            controls
            className="w-full h-full rounded-md object-cover"
          />
        ) : (
          <div className="aspect-video bg-slate-200 flex justify-center items-center rounded-md">
            <p className="text-slate-600 font-bold">No video available</p>
          </div>
        )}
      </div>
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
            {chapter.attachments.map((attachment) => (
              <li key={attachment.id}>
                <a
                  href={attachment.url}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {attachment.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}