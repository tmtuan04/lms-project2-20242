'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  stats: {
    totalCourses: number;
    totalUsers: number;
    totalInstructors: number;
    totalEnrollments: number;
  };
  coursesByCategory: {
    name: string;
    _count: {
      courses: number;
    };
  }[];
  topCourses: {
    id: string;
    title: string;
    _count: {
      enrollments: number;
    };
  }[];
  recentEnrollments: {
    createdAt: string;
    course: {
      title: string;
    };
    user: {
      name: string;
      email: string;
    };
  }[];
}

export default function DashboardStats() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.stats.totalCourses}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.stats.totalUsers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.stats.totalInstructors}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.stats.totalEnrollments}</div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Courses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.coursesByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="_count.courses" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Top Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between">
                <div className="font-medium">{course.title}</div>
                <div className="text-sm text-gray-500">
                  {course._count.enrollments} enrollments
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentEnrollments.map((enrollment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{enrollment.user.name}</div>
                  <div className="text-sm text-gray-500">{enrollment.course.title}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(enrollment.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 