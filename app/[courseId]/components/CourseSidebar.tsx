import { CourseWithLessons } from "@/app/lib/definitions";
import ChapterItem from "./ChapterItem";

interface CourseSidebarProps {
  course: CourseWithLessons;
}

export default function CourseSidebar({ course }: CourseSidebarProps) {
  return (
    <div className="h-full border-r flex flex-col bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{course.title}</h2>
      </div>
      <div className="flex flex-col w-full overflow-y-auto">
        {course.chapters.map((chapter) => (
          <ChapterItem 
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
            isLocked={chapter.isLocked}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
}
