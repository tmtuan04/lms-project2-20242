'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, LogOut } from "lucide-react";
import { EnrollButton } from "./EnrollButton";
import { useUserStore } from "../../stores/useUserStore";

interface CourseHeaderProps {
  imageUrl: string;
  title: string;
  instructor: string;
  price: number;
  courseId: string;
}

export function CourseHeader({ title, instructor, price, courseId, imageUrl }: CourseHeaderProps) {
  const user = useUserStore((s) => s.user);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkEnrollment = async () => {
      const res = await fetch(`/api/enrollments/check?courseId=${courseId}&userId=${user.id}`);
      const data = await res.json();
      setIsEnrolled(data.isEnrolled);
    };

    checkEnrollment();
  }, [user, courseId]);

  return (
    <div className="h-[70px] border-b fixed top-0 left-0 right-0 z-50 bg-white flex items-center p-6">
      <Link href="/" className="md:hidden mr-4 hover:opacity-75 transition">
        <ArrowLeft />
      </Link>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10 rounded-sm overflow-hidden border border-gray-300">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40px, 40px"
            />
          </div>
          <h1 className="line-clamp-1 font-bold text-gray-800 text-[1.1rem]">
            {title} - <span className="hover:underline cursor-pointer">{instructor}</span>
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {!isEnrolled && <EnrollButton price={price} courseId={courseId} />}
          <Link href="/dashboard">
            <button className="group flex items-center gap-2 font-medium text-gray-900 cursor-pointer px-3 py-1 rounded-sm hover:bg-gray-200">
              <LogOut size={14} className="group-hover:scale-110 transition" />
              <span className="text-sm">Exit</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}