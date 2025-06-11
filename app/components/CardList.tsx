"use client";
import { useState } from "react";
import Card from "./Card";
import { CourseCardProps } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface CardListProps {
    courses: CourseCardProps[];
    title: string;
}

export default function CardList({ courses, title }: CardListProps) {
    const [showAll, setShowAll] = useState(false);
    const displayCourses = showAll ? courses : courses.slice(0, 4);

    const handleScroll = () => {
        setShowAll((v) => !v);
    };

    useEffect(() => {
        window.scrollBy({
            top: window.innerHeight * (showAll ? 0.4 : -0.4),
            behavior: "smooth",
        });
    }, [showAll]);

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-bold">{title}</p>
                {courses.length > 4 && (
                    <Button
                        className="flex items-center group bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full shadow-md transition cursor-pointer"
                        onClick={handleScroll}
                    >
                        {showAll ? "Collapse" : "View All"}
                        <ChevronRight className="-ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                )}

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayCourses.map((course) => (
                    <Card
                        key={course.id}
                        id={course.id}
                        instructorId={course.instructorId}
                        instructor={course.instructor}
                        imageUrl={course.imageUrl}
                        title={course.title}
                        category={course.category}
                        chaptersCount={course.chaptersCount}
                        price={course.price}
                    />
                ))}
            </div>
        </div>
    );
}