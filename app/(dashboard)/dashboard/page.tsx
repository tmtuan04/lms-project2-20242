import { UserCourseCardProps } from "../../lib/definitions";

import UserCourseCard from "../_components/UserCourseCard";
import { Clock, CircleCheckBig } from "lucide-react";

export const initUserCourseCards: UserCourseCardProps[] = [
  {
    id: "course-001",
    instructor: "Nguyễn Văn A",
    title: "Lập trình React cơ bản",
    category: "Lập trình web",
    chaptersCount: 16,
    completedChaptersCount: 0,
    imageUrl: "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826"
  },
  {
    id: "course-002",
    instructor: "Trần Thị B",
    title: "Thiết kế UI/UX chuyên sâu",
    category: "Thiết kế",
    chaptersCount: 12,
    completedChaptersCount: 5,
    imageUrl: "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826"
  },
  {
    id: "course-003",
    instructor: "Lê Văn C",
    title: "Python cho người mới bắt đầu",
    category: "Lập trình",
    chaptersCount: 20,
    completedChaptersCount: 20,
    imageUrl: "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826"
  },
  {
    id: "course-004",
    instructor: "Lê Văn C",
    title: "Python cho người mới bắt đầu",
    category: "Lập trình",
    chaptersCount: 20,
    completedChaptersCount: 20,
    imageUrl: "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826"
  },
  {
    id: "course-005",
    instructor: "Lê Văn C",
    title: "Python cho người mới bắt đầu",
    category: "Lập trình",
    chaptersCount: 20,
    completedChaptersCount: 20,
    imageUrl: "https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1744095558~exp=1744099158~hmac=513fbe7193e61e2688e0ff914d8a660be0b02d2f01d4f097c0e0d3b96f41fc94&w=826"
  }
]

export default function DashboardPage() {
  // const [userCourseCards] = useState<UserCourseCardProps[]>(initUserCourseCards);
  // const [filter, setFilter] = useState<string | null>(null);

  const completedCourses = initUserCourseCards.filter(
    (course) => course.completedChaptersCount === course.chaptersCount
  );

  const inProgressCourses = initUserCourseCards.filter(
    (course) => course.completedChaptersCount < course.chaptersCount
  );

  // const filteredCourses = filter
  //   ? filter === "completed"
  //     ? completedCourses
  //     : inProgressCourses
  //   : userCourseCards;

  // const toggleFilter = (type: string) => {
  //   setFilter((prevFilter) => (prevFilter === type ? null : type));
  // };

  return (
    <div className="flex flex-col h-full">

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-8 py-3">
        <div className="bg-white rounded-xl p-3 border flex gap-3 items-center h-20">
          <div className="bg-blue-200 rounded-full text-blue-600 ">
            <Clock className=" m-2 h-8 w-8 bg-blue-200 rounded-full text-blue-600 " />
          </div>
          <div>
            <p className="text-lg font-semibold">In Progress</p>
            <p className="text-lg font-semibold text-gray-400">{inProgressCourses.length} Courses</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border flex flex-row gap-2 items-center h-20">
          <div className="bg-green-200 rounded-full text-green-600 ">
            <CircleCheckBig className=" m-2 h-8 w-8" />
          </div>
          <div>
            <p className="text-lg font-semibold">Completed</p>
            <p className="text-lg font-semibold text-gray-400">{completedCourses.length} Courses</p>
          </div>
        </div>
      </div>

      {/* Toggle Buttons 
      <div className="flex justify-start gap-4 px-8 py-2 -mb-4">
        <button
          onClick={() => toggleFilter("inProgress")}
          className={`px-4 py-2 rounded-full font-semibold cursor-pointer  ${filter === "inProgress" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          In Progress
        </button>
        <button
          onClick={() => toggleFilter("completed")}
          className={`px-4 py-2 rounded-full font-semibold cursor-pointer  ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Completed
        </button>
      </div>
      */}

      {/* Courses Section */}
      <main className="flex-1">
        <div className="flex justify-center p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {initUserCourseCards.map((course) => (
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