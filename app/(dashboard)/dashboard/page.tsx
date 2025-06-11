"use client";

import { getInitUserCourseCards } from "@/app/lib/data";
import UserCourseCard from "../_components/UserCourseCard";
import { Clock, CircleCheckBig, BookOpenIcon, CircleChevronRight } from "lucide-react";
import { useUserStore } from "@/app/stores/useUserStore";
import { useState, useEffect } from "react";
import { UserCourseCardProps } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const [userCourseCards, setUserCourseCards] = useState<UserCourseCardProps[]>([])
  // const userCourseCards = await getInitUserCourseCards(userId);

  const sortedCourses = [...userCourseCards].sort((a, b) => {
    const aPercent = a.chaptersCount === 0 ? 0 : a.completedChaptersCount / a.chaptersCount;
    const bPercent = b.chaptersCount === 0 ? 0 : b.completedChaptersCount / b.chaptersCount;
    return aPercent - bPercent; // sort từ thấp đến cao
  });

  useEffect(() => {
    if (!user) {
      return
    }
    const fetchData = async () => {
      // setIsLoading(true)
      const data = await getInitUserCourseCards(user.id);
      setUserCourseCards(data);
      // setIsLoading(false)
    }
    fetchData()
  }, [user]);

  const completedCourses = userCourseCards.filter(
    (course) =>
      course.chaptersCount > 0 &&
      course.completedChaptersCount === course.chaptersCount
  );

  const inProgressCourses = userCourseCards.filter(
    (course) =>
      course.chaptersCount > 0 &&
      course.completedChaptersCount < course.chaptersCount
  );


  return (

    userCourseCards.length === 0 ?
      <>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <BookOpenIcon className="w-16 h-16 text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Bạn chưa đăng ký khóa học nào</h2>
          <p className="text-gray-500 mb-6">
            Hãy bắt đầu khám phá và chọn một khóa học phù hợp để học nhé!
          </p>
          <Link href="/dashboard/browse">
            <Button variant="default" className="px-6 py-2 text-base group ">
              Khám phá khóa học
              <CircleChevronRight className="group-hover:scale-110 group-hover:translate-x-1  transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </>
      : (

        <div className="flex flex-col h-full">
          {/* Summary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-8 py-3">
            <div className="bg-white rounded-xl p-3 border flex gap-4 items-center h-16">
              <div className="bg-blue-200 rounded-full text-blue-600 ">
                <Clock className=" m-2 h-4 w-4 bg-blue-200 rounded-full text-blue-600 " />
              </div>
              <div>
                <p className="font-semibold">In Progress</p>
                <p className="text-sm font-medium text-gray-400">{inProgressCourses.length} Courses</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border flex flex-row gap-4 items-center h-16">
              <div className="bg-green-200 rounded-full text-green-600 ">
                <CircleCheckBig className="m-2 h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold">Completed</p>
                <p className="text-sm font-medium text-gray-400">{completedCourses.length} Courses</p>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <main className="flex-1">
            <div className="flex justify-center p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
                {sortedCourses.map((course) => (
                  <UserCourseCard
                    key={course.id}
                    id={course.id}
                    instructor={course.instructor}
                    imageUrl={course.imageUrl}
                    title={course.title}
                    category={course.category}
                    chaptersCount={course.chaptersCount}
                    completedChaptersCount={course.completedChaptersCount}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      )

  );

}
