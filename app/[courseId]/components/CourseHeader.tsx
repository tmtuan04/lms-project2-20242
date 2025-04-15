import { CourseWithLessons } from "@/app/lib/definitions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CourseHeaderProps {
  course: CourseWithLessons;
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white">
      <Link
        href="/"
        className="md:hidden mr-4 hover:opacity-75 transition"
      >
        <ArrowLeft />
      </Link>
      <div className="flex items-center justify-between w-full">
        <h1 className="line-clamp-1 font-bold">
          {course.title}
        </h1>
        <div className="text-sm text-slate-500">
          by {course.instructor}
        </div>
      </div>
    </div>
  );
}
