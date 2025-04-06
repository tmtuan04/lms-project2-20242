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
