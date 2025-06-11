import Image from "next/image";
import Link from "next/link";
import { UserCourseCardProps } from "../../lib/definitions";
import { CircleCheckBig } from "lucide-react";
import { Progress as ProgressShadCN } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const UserCourseCard: React.FC<UserCourseCardProps> = ({
    id,
    instructor,
    title,
    category,
    chaptersCount,
    completedChaptersCount,
    imageUrl,
}) => {
    const percent = Math.round((100 * completedChaptersCount) / chaptersCount);
    const isCompleted = percent === 100;

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col justify-between">
            <Link href={`/${id}/chapters/1`}>
                <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
                    <Image
                        className="object-cover"
                        src={imageUrl}
                        alt="Course Image"
                        fill
                    />
                </div>
            </Link>
            <div className="p-3 flex flex-col gap-2">
                <Link href={`/${id}/chapters/1`}>
                    <h3 className="text-base font-semibold text-[#4B4B4B] dark:text-white line-clamp-2 leading-tight">
                        {title}
                    </h3>
                </Link>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                    {category} •{" "}
                    <span className="font-medium hover:underline cursor-pointer">
                        {instructor}
                    </span>
                </p>
                <div className="flex items-center justify-between">
                    <span className="bg-gray-100 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-500">
                        {chaptersCount} chapters
                    </span>
                    <CircleCheckBig
                        className={`h-5 w-5 text-[#0fba82] ${isCompleted ? "block" : "hidden"}`}
                    />
                </div>
                <div className={`${isCompleted ? "text-[#0fba82]" : "text-[#0484cc]"}`}>
                    <ProgressShadCN
                        value={percent}
                        indicatorClassName={`${isCompleted ? "bg-[#0fba82]" : "bg-[#0484cc]"}`}
                    />
                    <span className="text-sm font-semibold">{percent}% completed</span>
                </div>

                {isCompleted && (
                    <div className="flex flex-col gap-2 mt-2">
                        <Link href={`/dashboard/courses/${id}/certificate`}>
                            <Button variant="secondary" className="w-full text-sm">
                                Rate this Course
                            </Button>
                        </Link>
                        <Link href={`/dashboard/courses/${id}/feedback`}>
                            <Button variant="outline" className="w-full text-sm">
                                View Certificate
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCourseCard;