"use client";

import { useState } from "react";
import DataTable from "./data-table";
import { CourseTableData } from "@/app/lib/definitions";
import CreateCourseForm from "./ui/form";
import { columns } from "./columns";
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
    const [data, setData] = useState<CourseTableData[]>(fetchData);
    const [editingCourse, setEditingCourse] = useState<CourseTableData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // id này sinh từ chiều dài của mảng, không phải là id thực tế của course
    const handleCreate = (newRecord: Omit<CourseTableData, "id">) => {
        const record = { ...newRecord, id: String(data.length + 1) };
        setData([...data, record]);
        setIsDialogOpen(false);
    };

    // const handleUpdate = (updatedCourse: CourseTableData) => {
    //     setData(data.map((record) => (record.id === updatedCourse.id ? updatedCourse : record)));
    //     setIsDialogOpen(false);
    //     setEditingCourse(null);
    // };

    const handleDelete = (id: string) => {
        setData(data.filter((record) => record.id !== id));
    };

    const handlemultiDelete = (courses: CourseTableData[]) => {
        const courseIds = new Set(courses.map((record) => record.id));
        setData(data.filter((record) => !courseIds.has(record.id)));
    };

    const handleEdit = (record: CourseTableData) => {
        setEditingCourse(record);
        setIsDialogOpen(true);
    };

    const openCreateDialog = () => {
        setEditingCourse(null);
        setIsDialogOpen(true);
    };
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
                            initialData={editingCourse}
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