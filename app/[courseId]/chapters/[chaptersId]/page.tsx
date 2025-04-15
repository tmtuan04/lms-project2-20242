import { fetchCourseById } from "@/app/lib/data";
import { redirect } from "next/navigation";
// import CourseContent from "./components/CourseContent";

interface ChapterPageProps {
  params: {
    courseId: string;
    chapterId: string;
  }
}

export default async function ChapterPage({
  params,
}: ChapterPageProps) {
  try {
    const { courseId, chapterId } = params;
    const course = await fetchCourseById(courseId);

    // Debug log
    console.log("Course:", course);
    console.log("ChapterId:", chapterId);

    if (!course) {
      console.log("Course not found");
      return redirect("/");
    }

    // Kiểm tra chapters có tồn tại không
    if (!course.chapters || course.chapters.length === 0) {
      return (
        <div className="p-6 max-w-5xl mx-auto">
          <div className="text-center text-gray-500">
            No chapters available for this course.
          </div>
        </div>
      );
    }

    // Tìm chapter theo index
    const chapterIndex = parseInt(chapterId) - 1;
    const chapter = course.chapters[chapterIndex];

    // Debug log
    console.log("Chapter Index:", chapterIndex);
    console.log("Chapter:", chapter);

    // Nếu không tìm thấy chapter được yêu cầu, hiển thị chapter đầu tiên
    if (!chapter) {
      const firstChapter = course.chapters[0];
      return (
        <div className="p-6 max-w-5xl mx-auto">
          {/* Video placeholder */}
          <div className="aspect-video relative bg-slate-200 rounded-md mb-4">
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-500">
              {firstChapter.videoUrl ? "Video Player" : "No video available"}
            </div>
          </div>

          {/* Content */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">{firstChapter.title}</h2>
            <p className="text-slate-600">
              {firstChapter.description || "No description available."}
            </p>

            {/* Attachments section if any */}
            {firstChapter.attachments && firstChapter.attachments.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Attachments:</h3>
                <ul className="space-y-2">
                  {firstChapter.attachments.map((attachment) => (
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
        </div>
      );
    }

    // Hiển thị chapter được yêu cầu
    return (
      <div className="p-6 max-w-5xl mx-auto">
        {/* Video placeholder */}
        <div className="aspect-video relative bg-slate-200 rounded-md mb-4">
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-500">
            {chapter.videoUrl ? "Video Player" : "No video available"}
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">{chapter.title}</h2>
          <p className="text-slate-600">
            {chapter.description || "No description available."}
          </p>

          {/* Attachments section if any */}
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
}
