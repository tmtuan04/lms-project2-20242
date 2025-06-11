import Image from "next/image";
import Link from "next/link";
import { InstructorDetails } from "@/app/lib/data";
import { formatPrice } from "@/lib/utils";

interface InstructorDialogContentProps {
  instructorDetails: InstructorDetails | null;
  isLoading: boolean;
}

const InstructorDialogContent: React.FC<InstructorDialogContentProps> = ({
  instructorDetails,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!instructorDetails) {
    return <p className="text-center text-gray-500 py-4">Failed to load instructor information</p>;
  }

  return (
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
                  <p
                    className="text-sm font-medium leading-tight line-clamp-2"
                    title={course.title}
                    style={{ maxWidth: "calc(100% - 20px)", wordBreak: "break-word" }}
                  >
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {course.enrolledCount} students • {formatPrice(course.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDialogContent; 