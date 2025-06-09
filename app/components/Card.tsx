"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import { CourseCardProps } from "../lib/definitions";
import { InstructorDetails } from "../lib/data";

const Card: React.FC<CourseCardProps> = ({
  id,
  instructor,
  instructorId,
  title,
  category,
  chaptersCount,
  price,
  imageUrl,
}) => {
  const [instructorDetails, setInstructorDetails] = useState<InstructorDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      if (!instructorId) return;

      setIsLoading(true);
      try {
        const response = await fetch(`/api/instructors/${instructorId}`);
        if (!response.ok) throw new Error("Failed to fetch instructor details");
        const data = await response.json();
        setInstructorDetails(data);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructorDetails();
  }, [instructorId]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <Link href={`/course/${id}`}>
        <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
          <Image className="object-cover" src={imageUrl} alt="Course Image" fill />
        </div>
      </Link>
      <div className="p-3">
        <Link href={`/course/${id}`}>
          <h3 className="text-base font-semibold text-[#4B4B4B] dark:text-white line-clamp-2 leading-tight">
            {title}
          </h3>
        </Link>
        <p className="my-2 text-sm text-gray-700 dark:text-gray-400">
          {category} •{" "}
          <Dialog>
            <DialogTrigger asChild>
              <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                {instructor}
              </span>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Instructor Information</DialogTitle>
              </DialogHeader>
              {isLoading ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                </div>
              ) : instructorDetails ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          instructorDetails.imageUrl ||
                          "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                        }
                        alt={instructorDetails.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{instructorDetails.name}</h3>
                      <p className="text-sm text-gray-600">{instructorDetails.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Total Courses</p>
                      <p className="text-xl font-semibold">{instructorDetails.totalCourses}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-xl font-semibold">{instructorDetails.totalStudents}</p>
                    </div>
                  </div>

                  {instructorDetails.featuredCourses.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Featured Courses</h4>
                      <div className="space-y-2">
                        {instructorDetails.featuredCourses.map((course) => (
                          <Link
                            key={course.id}
                            href={`/course/${course.id}`}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={
                                  course.imageUrl ||
                                  "https://img.freepik.com/premium-vector/print_1126632-1359.jpg"
                                }
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{course.title}</p>
                              <p className="text-xs text-gray-500">
                                {course.enrolledCount} students • {formatPrice(course.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Failed to load instructor information
                </p>
              )}
            </DialogContent>
          </Dialog>
        </p>
        <div className="my-4 flex items-center justify-between">
          <span className="bg-gray-100 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-500">
            {chaptersCount} chapters
          </span>
          <span
            className={`text-sm ${
              price === 0
                ? "text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full"
                : "text-[#4B4B4B] font-semibold"
            }`}
          >
            {formatPrice(price)}
          </span>
        </div>
        <Link
          href={`/course/${id}`}
          className="flex items-center justify-center w-full px-3 py-1.5 text-[0.9rem] font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-300"
        >
          Read more
          <svg
            className="w-3 h-3 ms-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;