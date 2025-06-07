'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Lock, FileText, ChevronDown, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

interface SidebarProps {
  courseId: string;
  chapters: { id: string; title: string }[];
}

export default function Sidebar({ courseId, chapters }: SidebarProps) {
  const pathname = usePathname();
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenChapterId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full overflow-y-auto">
      {chapters.map((chapter, index) => {
        const chapterPath = `/${courseId}/chapters/${index + 1}`;
        const isActive = pathname === chapterPath;
        const isFirstChapter = index === 0;
        const isOpen = openChapterId === chapter.id;

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
              {/* Main clickable chapter area that navigates */}
              <Link
                href={chapterPath}
                className="flex items-center gap-x-2 flex-1"
              >
                {isFirstChapter ? (
                  <Compass className={clsx("h-4 w-4", isActive ? "text-[#255C6E]" : "")} />
                ) : (
                  <Lock className={clsx("h-4 w-4", isActive ? "text-[#255C6E]" : "")} />
                )}
                {chapter.title}
              </Link>

              {/* Toggle button */}
              <button
                onClick={() => toggleOpen(chapter.id)}
                className="flex items-center gap-x-1 text-xs text-gray-500 hover:text-gray-700"
              >
                <span>Attached Documents</span>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Sub-item PDF (visible when open) */}
            {isOpen && (
              <Link
                href="#"
                className="flex items-center gap-x-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 pl-10 py-2 transition-all"
              >
                <FileText className="h-4 w-4" />
                PDF Document
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}