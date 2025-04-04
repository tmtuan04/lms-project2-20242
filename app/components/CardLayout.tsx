import { fetchCourses } from "../lib/data";
import { CourseCard } from "./MyCard";
// import Link from "next/link";
export default async function CardLayout() {
  const courses = await fetchCourses();

  if (!courses || courses.length === 0) {
    return <p className="mt-4 text-gray-400">No courses available.</p>;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          // <Link
          //   key={course.id}
          //   href={`/${course.title}`}>
          <CourseCard
            id={course.id}
            key={course.id} // Nếu có id trong database, dùng để tối ưu React rendering
            imageUrl={course.imageUrl}
            title={course.title}
            category={course.category}
            chapter={course.chapter}
            price={course.price}
          />
          // </Link>
        ))}
      </div>
    </div>
  );
}
