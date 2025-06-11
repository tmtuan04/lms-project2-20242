"use client";

import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/utils";
import { CourseCardProps } from "../lib/definitions";

import InstructorDialog from "@/components/InstructorDialog";

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
          <InstructorDialog
            instructorId={instructorId}
            instructorName={instructor}
            triggerElement={
              <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                {instructor}
              </span>
            }
          />
        </p>
        <div className="my-4 flex items-center justify-between">
          <span className="bg-gray-100 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-500">
            {chaptersCount} chapters
          </span>
          <span
            className={`text-sm ${price === 0
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