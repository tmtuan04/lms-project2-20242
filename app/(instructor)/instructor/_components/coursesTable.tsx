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
// shadCN UI
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface CourseTableProps {
    fetchData: CourseTableData[];
}

export default function CourseTable({ fetchData }: CourseTableProps) {
    const router = useRouter();

    const [data, setData] = useState<CourseTableData[]>([]);

    // const [editingCourse, setEditingCourse] = useState<CourseTableData | null>(null);

    // Đóng mở form
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Event Create Course
    const handleCreate = (newRecord: Omit<CourseTableData, "id">) => {
        const record = { ...newRecord, id: String(data.length + 1) };
        setData([record, ...data]);
        setIsDialogOpen(false);
    };

    // Event Update Course - Tạm thời đang cần sửa ở đây
    // const handleUpdate = (updatedCourse: CourseTableData) => {
    //     setData(data.map((record) => (record.id === updatedCourse.id ? updatedCourse : record)));
    //     setIsDialogOpen(false);
    //     setEditingCourse(null);
    // };

    // Event Delete Course
    const handleDelete = (id: string) => {
        setData(data.filter((record) => record.id !== id));
    };

    // Xoá nhiều khoá học - Khả năng không cần thiết
    const handlemultiDelete = (courses: CourseTableData[]) => {
        const courseIds = new Set(courses.map((record) => record.id));
        setData(data.filter((record) => !courseIds.has(record.id)));
    };

    const handleEdit = (record: CourseTableData) => {
        router.push(`/instructor/edit/${record.id}`)

        // setEditingCourse(record);
        // setIsDialogOpen(true);
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