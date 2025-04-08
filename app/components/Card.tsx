import Image from "next/image";
import Link from "next/link";

import { CourseCardProps } from "../lib/definitions";

const Card: React.FC<CourseCardProps> = ({
  imageUrl,
  instructor,
  title,
  category,
  chapter,
  price,
  courseUrl,
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <Link href={courseUrl}>
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            className="object-cover"
            src={imageUrl}
            alt="Course Image"
            fill
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={courseUrl}>
          <p className="mb-1 text-xl font-semibold tracking-tight text-[#4B4B4B] dark:text-white">
            {title}
          </p>
        </Link>
        <p className="mb-5 font-normal text-sm text-gray-700 dark:text-gray-400">
          {category} -{" "}
          <span className="font-semibold cursor-pointer hover:underline hover:underline-offset-2">
            {instructor}
          </span>
        </p>
        <span className="bg-gray-200 inline-block mb-4 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 w-auto">
          {chapter} chapters
        </span>
        {/* Read more and price */}
        <div className="flex justify-between items-center">
          <Link
            href={courseUrl}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
          <label className="font-semibold text-[#4B4B4B] text-base">
            {price} đ
          </label>
        </div>
      </div>
    </div>
  );
};

export default Card;
