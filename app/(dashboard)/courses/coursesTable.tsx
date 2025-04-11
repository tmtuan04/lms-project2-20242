"use client";

import { useState } from "react";
import DataTable from "./data-table";
import { CourseTableData } from "./types/table";
import UserForm from "./form";
import { columns } from "./columns"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const initialData: CourseTableData[] = [
    { id: "1", price: 199000, status: "Published", title: "React Basics" },
    { id: "2", price: 299000, status: "Draft", title: "Advanced TypeScript" },
    { id: "3", price: 149000, status: "Published", title: "Intro to Tailwind" },
    { id: "4", price: 399000, status: "Published", title: "Fullstack with Next.js" },
    { id: "5", price: 99000, status: "Draft", title: "HTML & CSS Fundamentals" },
    { id: "6", price: 250000, status: "Published", title: "Node.js API Development" },
    { id: "7", price: 179000, status: "Draft", title: "UI/UX Design Basics" },
    { id: "8", price: 299000, status: "Published", title: "Firebase for Web Apps" },
    { id: "9", price: 199000, status: "Published", title: "Git & GitHub Mastery" },
    { id: "10", price: 349000, status: "Draft", title: "GraphQL from Scratch" },
    { id: "11", price: 349000, status: "Published", title: "GraphQL from Scratch" },
    { id: "12", price: 349000, status: "Draft", title: "GraphQL from Scratch" },
    { id: "13", price: 349000, status: "Published", title: "GraphQL from Scratch" },
];

export default function TablePage() {
    const [data, setData] = useState<CourseTableData[]>(initialData);
    const [editingCourse, setEditingCourse] = useState<CourseTableData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCreate = (newRecord: Omit<CourseTableData, "id">) => {
        const record = { ...newRecord, id: String(data.length + 1) };
        setData([...data, record]);
        setIsDialogOpen(false);
    };

    const handleUpdate = (updatedUser: CourseTableData) => {
        setData(data.map((record) => (record.id === updatedUser.id ? updatedUser : record)));
        setIsDialogOpen(false);
        setEditingCourse(null);
    };

    const handleDelete = (id: string) => {
        setData(data.filter((record) => record.id !== id));
    };

    const handlemultiDelete = (users: CourseTableData[]) => {
        const userIds = new Set(users.map((record) => record.id));
        setData(data.filter((record) => !userIds.has(record.id)));
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
                        <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
                        <DialogDescription>
                            Please fill out the form below to {editingCourse ? "update the course" : "create a new course"}.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <UserForm
                            onSubmit={editingCourse ? handleUpdate : handleCreate}
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