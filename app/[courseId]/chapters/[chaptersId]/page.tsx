import { fetchCourseById } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { type NextPage } from "next";

interface ChapterPageProps {
  params: Promise<{ courseId: string; chaptersId: string }>; // Type params as Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // Type searchParams as Promise
}

const ChapterPage: NextPage<ChapterPageProps> = async ({
  params,
}) => {
  try {
    const resolvedParams = await params; // Await params
    const { courseId, chaptersId: chapterId } = resolvedParams; // Destructure safely
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
    const chapter = course.chapters[chapterIndex];

    if (!chapter) {
      const firstChapter = course.chapters[0];
      return (
        <div className="p-6 max-w-5xl mx-auto">
          <div className="aspect-video relative bg-slate-200 rounded-md mb-4">
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-500">
              {firstChapter.videoUrl ? "Video Player" : "No video available"}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">{firstChapter.title}</h2>
            <p className="text-slate-600">
              {firstChapter.description || "No description available."}
            </p>

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

    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="aspect-video relative bg-slate-200 rounded-md mb-4">
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-500">
            {chapter.videoUrl ? "Video Player" : "No video available"}
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">{chapter.title}</h2>
          <p className="text-slate-600">
            {chapter.description || "No description available."}
          </p>

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
};

export default ChapterPage;