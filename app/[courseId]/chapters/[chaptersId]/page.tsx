import { fetchCourseById } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { type NextPage } from "next";
import ChapterContent from "../../components/ChapterContent";
// import { Lock, CircleAlert } from "lucide-react";

interface ChapterPageProps {
  params: Promise<{ courseId: string; chaptersId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ChapterPage: NextPage<ChapterPageProps> = async ({ params }) => {
  try {
    const resolvedParams = await params;
    const { courseId, chaptersId: chapterId } = resolvedParams;
    const course = await fetchCourseById(courseId);

    if (!course) {
      console.log("Course not found");
      return redirect("/");
    }

    if (!course.chapters || course.chapters.length === 0) {
      return (
        <div className="p-6 max-w-5xl mx-auto">
          <div className="text-center text-gray-500">
            No chapters available for this course.
          </div>
        </div>
      );
    }

    const chapterIndex = parseInt(chapterId) - 1;
    const chapter = course.chapters[chapterIndex] ?? course.chapters[0];

    return (
      <div className="p-6 max-w-5xl mx-auto">
        <ChapterContent chapter={chapter} courseId={courseId} />
      </div>
    );

  } catch (error) {
    console.error("Error in ChapterPage:", error);
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="text-center text-red-500">
          An error occurred while loading the chapter.
        </div>
      </div>
    );
  }
};

export default ChapterPage;