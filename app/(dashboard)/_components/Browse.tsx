"use client";

import { useState, useEffect } from "react";
import { fetchCategories } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import { fetchCourses } from "@/app/lib/data";
import Card from "@/app/components/Card";
import clsx from "clsx";
import { CourseCardProps } from "@/app/lib/definitions";
import { Category } from "@/app/lib/definitions";


export default function Browse() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [courses, setCourses] = useState<CourseCardProps[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        // Load categories
        const categoryData = await fetchCategories();
        const transformedCategories: Category[] = categoryData.map(row => ({
          id: String(row.id),
          name: String(row.name)
        }));
        setCategories(transformedCategories);
        if (transformedCategories.length > 0) setActiveCategories([transformedCategories[0].name]);

        // Load courses
        const courseData = await fetchCourses();
        setCourses(courseData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, []);

  const toggleCategory = (categoryName: string) => {
    setActiveCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  // Filter courses based on active categories
  const filteredCourses = courses.filter(course =>
    activeCategories.length === 0 || activeCategories.includes(course.category)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Category Tabs Section */}
      <div className="flex gap-4 p-3 border-gray-200 bg-white">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => toggleCategory(category.name)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm transition-colors",
              activeCategories.includes(category.name)
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Main Content Section */}
      <main className="flex-1">
        <div className="flex justify-center p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
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
        </div>
      </main>
    </div>
  );
}