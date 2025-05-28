"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Component UI Table
import DataTable from "./data-table";
import { CourseTableData } from "@/app/lib/definitions";
// Form để nhập khoá học mới?
import CreateCourseForm from "./ui/form";
// Cấu hình các cột cho DataTable
import { columns } from "./columns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from "@/app/stores/useUserStore";
import { toast } from "react-hot-toast";

interface CourseTableProps {
    fetchData: CourseTableData[];
}

export default function CourseTable({ fetchData }: CourseTableProps) {
    const user = useUserStore((s) => s.user);

    const router = useRouter();
    const [data, setData] = useState<CourseTableData[]>([]);

    // Đóng mở form
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Event Create Course
    // Omit là một utility type có sẵn trong TypeScript:  Omit<T, K> nghĩa là: lấy tất cả các field trong kiểu T, trừ đi K (trừ đi id vì nó tự sinh trong database)
    const handleCreate = async (newRecord: Omit<CourseTableData, "id">) => {
        try {
            const response = await fetch("/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...newRecord,
                    instructorId: user?.id
                })
            })
            if (!response.ok) throw new Error("Failed to create course");

            const createdCourse: CourseTableData = await response.json();
            console.log(createdCourse)
            setData((prev) => [createdCourse, ...prev]);
            setIsDialogOpen(false);

            toast.success("Create course successful");
        } catch (err) {
            console.error("Error creating course:", err);
            toast.error("Error creating course!")
        }
    };

    // Event Delete Course
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch("/api/courses", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id
                })
            });

            if (!response.ok) throw new Error("Failed to delete course");
            setData(data.filter((record) => record.id !== id));
            toast.success("Delete course successful!");
        } catch (err) {
            console.error("Error delete course:", err)
            toast.error("Error delete course");
        }
    };

    // Xoá nhiều khoá học - Khả năng không cần thiết
    const handlemultiDelete = (courses: CourseTableData[]) => {
        const courseIds = new Set(courses.map((record) => record.id));
        setData(data.filter((record) => !courseIds.has(record.id)));
    };

    const handleEdit = (record: CourseTableData) => {
        router.push(`/instructor/edit/${record.id}`)
    };  

    // Mở dialog để tạo khóa học
    const openCreateDialog = () => {
        // setEditingCourse(null);
        setIsDialogOpen(true);
    };

    useEffect(() => {
        setData(fetchData);
    }, [fetchData]);
    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Course</DialogTitle>
                        <DialogDescription>
                            Please fill out the form below to create a new course.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <CreateCourseForm
                            onSubmit={handleCreate}
                        // initialData={editingCourse}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            <DataTable
                columns={columns}
                data={data}
                onAdd={openCreateDialog}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onmultiDelete={handlemultiDelete}
            />
        </>
    );
}