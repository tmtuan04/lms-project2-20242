import { CourseTableData } from "@/app/lib/definitions"

const fetchData: CourseTableData[] = [
    { id: "1", price: 199000, status: "Published", title: "React Basics" },
    { id: "2", price: 299000, status: "Draft", title: "Advanced TypeScript" },
    { id: "3", price: 149000, status: "Published", title: "Intro to Tailwind" }
];

export default function TableTest() {
    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-900">Instructor Test</h1>
                <div className="mt-4">
                    {/* Thêm nội dung dashboard ở đây */}
                    <p className="text-gray-600">Welcome!</p>
                </div>
            </div>
        </>
    )
}