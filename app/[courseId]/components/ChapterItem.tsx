"use client";

import { usePathname } from "next/navigation";
import { Lock, PlayCircle } from "lucide-react";
import Link from "next/link";

interface ChapterItemProps {
  id: string;
  title: string;
  isLocked: boolean;
  courseId: string;
}

export default function ChapterItem({
  id,
  title,
  isLocked,
  courseId,
}: ChapterItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/${courseId}/chapters/${id}`;

  return (
    <Link
      href={`/${courseId}/chapters/${id}`}
      className={`flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-100/80 ${
        isActive && "text-slate-700 bg-slate-100 hover:bg-slate-100"
      }`}
    >
      <div className="flex items-center gap-x-2 py-4">
        {isLocked ? (
          <Lock className="h-4 w-4" />
        ) : (
          <PlayCircle className="h-4 w-4" />
        )}
        {title}
      </div>
    </Link>
  );
}
