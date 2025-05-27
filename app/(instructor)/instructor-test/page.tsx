"use client"

import { CourseTableData } from "@/app/lib/definitions";
import { useState } from "react";

const fetchData: CourseTableData[] = [
  { id: "1", price: 199000, status: "Published", title: "React Basics" },
  { id: "2", price: 299000, status: "Draft", title: "Advanced TypeScript" },
  { id: "3", price: 149000, status: "Published", title: "Intro to Tailwind" },
];

export default function TableTest() {
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredCourses = fetchData.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Instructor Dashboard Test</h1>

      <div className="mt-6 flex flex-col gap-4">
        {/* Filter and Create Button */}
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Filter course..."
            className="border border-gray-300 rounded px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow">
            + Create Course
          </button>
        </div>

        {/* Course Table */}
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {course.price.toLocaleString("vi-VN")} đ
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        course.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm relative">
                    <button
                      onClick={() => toggleMenu(course.id)}
                      className="cursor-pointer px-3 py-1 rounded"
                    >
                      ...
                    </button>

                    {openMenuId === course.id && (
                      <div className="absolute right-6 mt-2 w-32 bg-white border rounded shadow-md z-10">
                        <button
                          onClick={() => {
                            alert(`Edit ${course.title}`);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            alert(`Details for ${course.title}`);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Details
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Control Placeholder */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">{filteredCourses.length} result(s)</p>
          <div className="flex items-center gap-2 text-sm">
            Rows per page:
            <select className="border rounded px-2 py-1">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}