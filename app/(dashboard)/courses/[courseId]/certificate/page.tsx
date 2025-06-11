"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Certificate from "@/app/components/Certificate";
import { CourseData } from "@/app/lib/definitions";
import { useUserStore } from "@/app/stores/useUserStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CertificatePage = () => {
  const { courseId } = useParams();
  const user = useUserStore((state) => state.user);
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        const data = await res.json();
        if (res.ok) {
          setCourseData(data);
        } else {
          console.error("Failed to fetch course:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading || !courseData || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Course Certificate</h1>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Certificate
            courseData={courseData}
            userName={user.name}
            completionDate={new Date().toISOString()}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificatePage; 