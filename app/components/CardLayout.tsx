import { fetchCourses } from "../lib/data";
import Card from "./Card";

export default async function CardLayout() {
  const courses = await fetchCourses();

  if (!courses || courses.length === 0) {
    return <p className="mt-4 text-gray-400">No courses available.</p>;
  }

  return (
    <div className="flex justify-center p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card
            id={course.id}
            key={course.id} // Nếu có id trong database, dùng để tối ưu React rendering
            courseUrl={course.courseUrl}
            instructor={course.instructor}
            imageUrl={course.imageUrl}
            title={course.title}
            category={course.category}
            chapter={course.chapter}
            price={course.price}
          />
        ))}
        {/* <Card></Card> */}
      </div>
    </div>
  );
}
