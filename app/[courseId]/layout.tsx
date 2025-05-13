import { fetchCourseById } from "@/app/lib/data";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";
import HustLogo from "../components/HustLogo";
import Sidebar from "./components/Sidebar"; // Đã import Sidebar mới
import { EnrollButton } from "./components/EnrollButton";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = await params;

  const course = await fetchCourseById(resolvedParams.courseId);

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      {/* Sidebar */}
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <div className="h-full border-r flex flex-col bg-white">
          {/* Logo */}
          <div className="h-[70px] border-b flex items-center p-6">
            <HustLogo />
          </div>

          {/* Chapters */}
          <Sidebar courseId={course.id} chapters={course.chapters || []} />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-80 h-full">
        {/* Header */}
        <div className="h-[70px] border-b fixed top-0 left-0 right-0 z-50 bg-white flex items-center p-6">
          <Link href="/" className="md:hidden mr-4 hover:opacity-75 transition">
            <ArrowLeft />
          </Link>
          <div className="flex items-center justify-between w-full">
            <h1 className="line-clamp-1 font-bold text-gray-800 text-[1.1rem]">
              {course.title} -{" "}
              <span className="hover:underline cursor-pointer">{course.instructor}</span>
            </h1>
            <div className="ml-auto flex items-center gap-2">
              <Link href="/dashboard">
                <button
                  className="group flex items-center gap-2 font-medium text-gray-900 cursor-pointer px-3 py-1 rounded-sm hover:bg-gray-200"
                >
                  <LogOut size={14} className="group-hover:scale-110 transition" />
                  <span className="text-sm">Exit</span>
                </button>
              </Link>
              <EnrollButton price={course.price} courseId={course.id} />
            </div>
          </div>
        </div >

        {/* Main page content */}
        < div className="pt-[70px]" > {children}</div >
      </div >
    </div >
  );
}