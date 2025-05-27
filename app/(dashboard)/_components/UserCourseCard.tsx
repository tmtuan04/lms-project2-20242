import Image from "next/image";
import Link from "next/link";
// import { Progress } from 'antd';
import { UserCourseCardProps } from "../../lib/definitions";
import { CircleCheckBig } from "lucide-react";
import { Progress as ProgressShadCN } from "@/components/ui/progress";

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
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-lg">
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
            <div className="p-3">
                <Link href={`/${id}/chapters/1`}>
                    <h3 className="text-base font-semibold text-[#4B4B4B] dark:text-white line-clamp-2 leading-tight">
                        {title}
                    </h3>
                </Link>
                <p className="my-2 text-sm text-gray-700 dark:text-gray-400">
                    {category} •{" "}
                    <span className="font-medium hover:underline cursor-pointer">
                        {instructor}
                    </span>
                </p>
                <div className="my-4 flex items-center justify-between">
                    <span className="bg-gray-100 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-500">
                        {chaptersCount} chapters
                    </span>
                    <CircleCheckBig className={`h-5 w-5 text-[#0fba82] ${percent === 100 ? 'block' : 'hidden'}`} />
                </div>
                <div className={` ${percent === 100 ? 'text-[#0fba82]' : 'text-[#0484cc]'}`}>
                    {/* <Progress percent={percent} showInfo={false} status="active" strokeColor={percent === 100 ? '#0fba82' : '#0484cc'} /> */}
                    <ProgressShadCN value={percent} indicatorClassName={`${percent === 100 ? 'bg-[#0fba82]' : 'bg-[#0484cc]'}`} />
                    <span className="text-sm font-semibold ">
                        {percent}% completed
                    </span>
                </div>
            </div>
        </div >
    );
};

export default UserCourseCard;