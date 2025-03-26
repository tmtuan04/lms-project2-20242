'use client';
import MyCard from "@/components/ui/card";
import Tag from "@/components/ui/tag";
import { Course } from "@/components/ui/card";

const courses: Course[] = [
  {
    title: "React for Beginners",
    url: "https://th.bing.com/th/id/OIP.M8xAkuJb9TscK44TIJ_aXgHaEK?rs=1&pid=ImgDetMain",
    progress: 60,
    tag: "Computer Science",
    chapter: 12,
  },
  {
    title: "Advanced TypeScript",

    url: "https://th.bing.com/th/id/OIP.M8xAkuJb9TscK44TIJ_aXgHaEK?rs=1&pid=ImgDetMain",
    progress: 85,
    tag: "Engineering",
    chapter: 15,
  },
  {
    title: "Next.js Mastery",
    url: "https://th.bing.com/th/id/OIP.M8xAkuJb9TscK44TIJ_aXgHaEK?rs=1&pid=ImgDetMain",
    progress: 100,
    tag: "Computer Science",
    chapter: 10,
  },
  {
    title: "Accounting Basics",
    url: "https://th.bing.com/th/id/OIP.M8xAkuJb9TscK44TIJ_aXgHaEK?rs=1&pid=ImgDetMain",
    progress: 75,
    tag: "Accounting",
    chapter: 8,
  },
  {
    title: "Photography Essentials",
    url: "https://th.bing.com/th/id/OIP.M8xAkuJb9TscK44TIJ_aXgHaEK?rs=1&pid=ImgDetMain",
    progress: 50,
    tag: "Photography",
    chapter: 6,
  }
];

export default function Page() {
  return (
    <>
      <Tag />
      <div className="text-4xl flex flex-row gap-x-5 gap-y-4 pt-10 pl-20 flex-wrap ">
        {courses.map((course, index) => (
          <MyCard key={index} course={course} />
        ))}
      </div>
    </>
  );
}