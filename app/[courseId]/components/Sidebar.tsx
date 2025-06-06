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
            <button
              onClick={() => toggleOpen(chapter.id)}
              className={clsx(
                "w-full flex items-center justify-between gap-x-2 text-sm font-[500] pl-6 pr-4 py-4 transition-all cursor-pointer",
                {
                  "text-[#255C6E] bg-[#F2FBFF]": isActive,
                  "text-gray-700 hover:bg-gray-100": !isActive,
                }
              )}
            >
              <div className="flex items-center gap-x-2">
                {isFirstChapter ? (
                  <Compass className={clsx("h-4 w-4", isActive ? "text-[#255C6E]" : "")} />
                ) : (
                  <Lock className={clsx("h-4 w-4", isActive ? "text-[#255C6E]" : "")} />
                )}
                {chapter.title}
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-normal text-gray-500">Attached documents</span>
                {isOpen ? <ChevronDown className="h-4 w-4 cursor-pointer" /> : <ChevronRight className="h-4 w-4 cursor-pointer" />}
              </div>
            </button>

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