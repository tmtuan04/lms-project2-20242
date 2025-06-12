'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Lock, FileText, ChevronDown, ChevronRight, CheckCircle } from "lucide-react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useUserStore } from "@/app/stores/useUserStore";
import { useProgressStore } from "@/app/stores/useProgressStore";
import { checkUserEnrolled } from "@/app/lib/data";
import { toast } from "react-hot-toast"

interface SidebarProps {
  courseId: string;
  chapters: {
    id: string;
    title: string;
    attachments?: { id: string; name: string; url: string }[];
  }[];
}

export default function Sidebar({ courseId, chapters }: SidebarProps) {
  const user = useUserStore((s) => s.user);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  const pathname = usePathname();
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);
  const completedChapters = useProgressStore((state) => state.completedMap);
  const setManyCompleted = useProgressStore((state) => state.setManyCompleted);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (user?.id) {
        try {
          const enrolled = await checkUserEnrolled(courseId, user.id);
          setIsEnrolled(enrolled);
        } catch (error) {
          console.error("Error checking enrollment:", error);
          setIsEnrolled(false);
        }
      }
    };

    checkEnrollment();
  }, [courseId, user?.id]);

  const toggleOpen = (id: string) => {
    setOpenChapterId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    async function fetchProgress() {
      try {
        const results = await Promise.all(
          chapters.map((chapter) =>
            fetch(`/api/progress?chapterId=${chapter.id}&userId=${user?.id}`)
              .then((res) => res.json())
              .catch(() => null)
          )
        );

        const completedMap: Record<string, boolean> = {};
        chapters.forEach((chapter, idx) => {
          const result = results[idx];
          if (result && result.isCompleted) {
            completedMap[chapter.id] = true;
          }
        });

        setManyCompleted(completedMap);
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    }

    fetchProgress();
  }, [chapters, user?.id, setManyCompleted]);

  useEffect(() => {
    if (previousPath && previousPath !== pathname) {
      toast.success("Moved to new chapter!");
    }
    setPreviousPath(pathname);
  }, [pathname, previousPath]);

  return (
    <div className="flex flex-col w-full overflow-y-auto">
      {chapters.map((chapter, index) => {
        const chapterPath = `/${courseId}/chapters/${index + 1}`;
        const isActive = pathname === chapterPath;
        const isFirstChapter = index === 0;
        const isOpen = openChapterId === chapter.id;
        const isCompleted = completedChapters[chapter.id];

        return (
          <div key={chapter.id}>
            <div
              className={clsx(
                "w-full flex items-center justify-between gap-x-2 text-sm font-[500] pl-6 pr-4 py-4 transition-all",
                {
                  "text-[#255C6E] bg-[#F2FBFF]": isActive,
                  "text-gray-700 hover:bg-gray-100": !isActive,
                }
              )}
            >
              <Link
                href={chapterPath}
                className="flex items-center gap-x-3 flex-1"
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                ) : !isEnrolled && index > 0 ? (
                  <Lock className={clsx("h-4 w-4 flex-shrink-0 ", isActive && "text-[#255C6E]")} />
                ) : (
                  <Compass className={clsx("h-4 w-4 flex-shrink-0 ", isActive && "text-[#255C6E]")} />
                )}
                {index}. {chapter.title}
              </Link>

              {Array.isArray(chapter.attachments) && chapter.attachments.length > 0 && (isFirstChapter || isEnrolled) && (
                <button
                  onClick={() => toggleOpen(chapter.id)}
                  className="flex items-center gap-x-1 text-xs text-gray-500 hover:text-gray-700"
                >
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>

            {isOpen && Array.isArray(chapter.attachments) && chapter.attachments.length > 0 && (isFirstChapter || isEnrolled) && (
              <div className="flex flex-col">
                {chapter.attachments.map((attachment, index) => (
                  <Link
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 pl-10 py-2 transition-all"
                    title={attachment.name}
                  >
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate max-w-[240px]">{index}. {attachment.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}