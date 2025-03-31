import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CourseCardProps } from "../lib/definitions";
import { BookOpen } from "lucide-react";
import Image from "next/image";

export const CourseCard: React.FC<CourseCardProps> = ({
  imageUrl,
  title,
  category,
  chapter,
  price,
}) => {
  return (
    <Card className="w-82">
      {/* Image Section */}
      <div className="relative w-full h-40">
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>

      {/* Content Section */}
      <CardContent>
        <CardTitle className="text-lg font-semibold text-[#424242]">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500">{category}</CardDescription>

        {/* Chapters */}
        <div className="flex items-center gap-2 mt-4 text-gray-700">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
            <BookOpen size={14} className="text-green-600" />
          </div>

          <span className="text-sm">{chapter} chapters</span>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter>
        <span className="text-[#9B2F21] font-bold text-lg">$ {price} VND</span>
      </CardFooter>
    </Card>
  );
};

// import { Card, Progress } from 'antd';
// import { BookOutlined } from '@ant-design/icons';
// import type { ProgressProps } from 'antd';

// Định nghĩa kiểu dữ liệu cho props
// export interface Course {
//     title: string;
//     url: string;
//     progress: number;
//     tag: string;
//     chapter: number;
// }

// interface MyCardProps {
//     course: Course;
// }
// const conicColors: ProgressProps['strokeColor'] = {
//     '0%': 'oklch(0.586 0.253 17.585)',
//     '50%': 'oklch(0.546 0.245 262.881)',
//     '100%': 'oklch(0.723 0.219 149.579)',
// };

// // const twoColors: ProgressProps['strokeColor'] = {
// //     '0%': '#108ee9',
// //     '100%': '#87d068',
// // };

// const MyCard: React.FC<MyCardProps> = ({ course }) => {
//     return (
//         <Card
//             style={{ width: 320, border: '2px solid #D3D3D3' }}
//             hoverable={true}
//             cover={
//                 <img
//                     src={course.url}
//                     alt="background"
//                     width={300}
//                     height={200}
//                     style={{ objectFit: 'cover', height: 160, padding: 8, borderRadius: '16px' }}
//                 />
//             }
//         >
//             <div className="flex flex-col -mt-5">
//                 <p className="text-2xl">{course.title}</p>
//                 <p className="font-light text-gray-700">{course.tag}</p>
//             </div>
//             <div className="mt-3">
//                 <div className="flex items-center space-x-2">
//                     <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
//                         <BookOutlined style={{ color: '#22c55e' }} />
//                     </div>
//                     <span>{course.chapter} chapter</span>
//                 </div>

//                 <span className="font-semibold text-green-500 flex justify-end">
//                     {course.progress}% Completed
//                 </span>
//                 <Progress percent={course.progress} strokeColor={conicColors} showInfo={course.progress === 100} />
//             </div>
//         </Card>
//     );
// };

// export default MyCard;
