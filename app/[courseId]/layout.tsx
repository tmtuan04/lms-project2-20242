import { fetchCourseById } from "@/app/lib/data";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Compass, Lock } from "lucide-react";
import HustLogo from "../components/HustLogo";
import clsx from "clsx";

export default async function CourseLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string }
}) {
  const course = await fetchCourseById(params.courseId);

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      {/* Sidebar */}
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <div className="h-full border-r flex flex-col bg-white">
          {/* Course title */}
          <div className="h-[70px] border-b flex items-center p-6">
            <HustLogo />
          </div>
          
          {/* Chapters list */}
          <div className="flex flex-col w-full overflow-y-auto">
            {course.chapters?.map((chapter, index) => {
              // Kiểm tra xem chapter hiện tại có phải là chapter đầu tiên không
              const isFirstChapter = index === 0;
              
              return (
                <Link 
                  key={chapter.id}
                  href={`/${course.id}/chapters/${index + 1}`}
                  className={clsx(
                    "flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all",
                    {
                      "text-[#255C6E] bg-[#F2FBFF]": isFirstChapter,
                      "text-gray-700 hover:bg-gray-100": !isFirstChapter,
                    }
                  )}
                >
                  <div className="flex items-center gap-x-2 py-4">
                    {isFirstChapter ? (
                      <Compass className="h-4 w-4 text-[#255C6E]" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                    {`${isFirstChapter ? 'Introduction' : `Chapter ${index + 1}`}: ${chapter.title}`}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-80 h-full">
        {/* Header */}
        <div className="h-[70px] border-b fixed inset-y-0 w-full z-50 bg-white">
          <div className="h-full flex items-center p-6">
            <Link href="/" className="md:hidden mr-4 hover:opacity-75 transition">
              <ArrowLeft />
            </Link>
            <div className="flex items-center justify-between w-full">
              <h1 className="line-clamp-1 font-bold text-gray-700 text-[1.1rem]">
                {course.title} - <span className="hover:underline cursor-pointer">{course.instructor}</span>
              </h1>
              <div className="ml-auto">
                <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                  Enroll for 200.000 VND
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="pt-[70px]">
          {children}
        </div>
      </div>
    </div>
  );
}