'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Lock } from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  courseId: string;
  chapters: { id: string; title: string }[];
}

export default function Sidebar({ courseId, chapters }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full overflow-y-auto">
      {chapters.map((chapter, index) => {
        const chapterPath = `/${courseId}/chapters/${index + 1}`;
        const isActive = pathname === chapterPath;
        const isFirstChapter = index === 0;

        return (
          <Link
            key={chapter.id}
            href={chapterPath}
            className={clsx(
              "flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all",
              {
                "text-[#255C6E] bg-[#F2FBFF]": isActive,
                "text-gray-700 hover:bg-gray-100": !isActive,
              }
            )}
          >
            <div className="flex items-center gap-x-2 py-4">
              {isFirstChapter ? (
                <Compass className={clsx("h-4 w-4", isActive ? "text-[#255C6E]" : "")} />
              ) : (
                <Lock className={clsx("h-4 w-4", isActive ? "text-[#255C6E]" : "")} />
              )}
              {chapter.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
}