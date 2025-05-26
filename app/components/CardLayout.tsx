
import { fetchCourses } from "../lib/data";
import Card from "./Card";

export default async function CardLayout({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>; // Note the Promise type
}) {
  const params = await searchParams; // Await the searchParams
  const query = params?.query || ''; // Safely access query
  const courses = await fetchCourses(query);

  return (
    <div className="flex flex-col gap-6 p-5">
      {!courses || courses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No courses found matching your search.</p>
          <p className="text-gray-400">Try adjusting your search terms or browse all courses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              id={course.id}
              instructor={course.instructor}
              imageUrl={course.imageUrl}
              title={course.title}
              category={course.category}
              chaptersCount={course.chaptersCount}
              price={course.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}