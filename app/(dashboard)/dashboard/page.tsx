"use client";

import { getInitUserCourseCards } from "@/app/lib/data";
import UserCourseCard from "../_components/UserCourseCard";
import { Clock, CircleCheckBig } from "lucide-react";
import { useUserStore } from "@/app/stores/useUserStore";
import { useState, useEffect } from "react";
import { UserCourseCardProps } from "@/app/lib/definitions";


export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const [userCourseCards, setUserCourseCards] = useState<UserCourseCardProps[]>([])
  // const userCourseCards = await getInitUserCourseCards(userId);

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
    <div className="flex flex-col h-full">
      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-8 py-3">
        <div className="bg-white rounded-xl p-3 border flex gap-3 items-center h-16">
          <div className="bg-blue-200 rounded-full text-blue-600 ">
            <Clock className=" m-2 h-4 w-4 bg-blue-200 rounded-full text-blue-600 " />
          </div>
          <div>
            <p className="font-medium">In Progress</p>
            <p className="text-sm font-medium text-gray-400">{inProgressCourses.length} Courses</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border flex flex-row gap-2 items-center h-16">
          <div className="bg-green-200 rounded-full text-green-600 ">
            <CircleCheckBig className="m-2 h-4 w-4" />
          </div>
          <div>
            <p className="font-medium">Completed</p>
            <p className="text-sm font-medium text-gray-400">{completedCourses.length} Courses</p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <main className="flex-1">
        <div className="flex justify-center p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userCourseCards.map((course) => (
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
  );
}
