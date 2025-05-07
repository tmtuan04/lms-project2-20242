"use client";

// import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from "uuid"
import Link from "next/link";
import Image from "next/image";

import { TableOfContents, Upload, Image as ImageIcon } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Chapter = {
    id: string;
    title: string;
};

export default function EditCoursePage() {
    // const { id } = useParams<{ id: string }>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [chapters, setChapters] = useState<Chapter[]>([]);

    const handleAddChapter = () => {
        const newChapter = { id: uuidv4(), title: "New Chapter" };
        setChapters([...chapters, newChapter]);
    };
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
        maxFiles: 1,
        maxSize: 2 * 1024 * 1024, // Giới hạn 2MB
    });

    return (
        <div className="">
            <div className="bg-yellow-100 p-4 text-sm text-yellow-700">
                This course is <span className="font-bold">unpublished</span>. It will not be visible to students.
            </div>

            <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">Course Setup</h1>
                        <p className="text-sm text-gray-800">Completed all fields (1/6)</p>
                    </div>
                    <Button>Publish</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customize your course */}
                    <div className="space-y-4">
                        <div className="border p-4 rounded-md">
                            <h2 className="font-semibold mb-2">Course Title</h2>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Course Title"
                            />
                        </div>

                        <div className="border p-4 rounded-md">
                            <h2 className="font-semibold mb-2">Course Description</h2>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Course Description"
                            />
                        </div>
                        <div className="border p-4 rounded-md flex flex-col">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="flex items-center gap-2 font-semibold mb-2">
                                    <ImageIcon size={20} aria-hidden="true" />Course Image
                                </h2>
                                <Button variant="outline" size="sm">+ Add an image</Button>
                            </div>

                            <div
                                {...getRootProps()}
                                className="h-48 bg-gray-100 flex items-center justify-center rounded text-center cursor-pointer border-dashed border-2 border-gray-300 hover:border-gray-400 transition relative"
                            >
                                <input {...getInputProps()} />
                                {imagePreview ? (
                                    <Image fill src={imagePreview} alt="Course Preview" className="h-full object-cover rounded" />
                                ) : isDragActive ? (
                                    <p className="text-sm text-gray-600">Drop the image here...</p>
                                ) : (
                                    <p className="text-sm text-gray-600">Drag & drop an image here, or click to select one</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right panel */}
                    <div className="space-y-4">
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 font-semibold mb-2"><TableOfContents size={20} /> Course Chapters</h2>
                                <Button variant="outline" size="sm" onClick={handleAddChapter}>+ Add a chapter</Button>
                            </div>
                            <div className="text-sm text-gray-500">
                                {chapters.length === 0 ? "No chapters" : "Drag and drop to reorder chapters"}
                            </div>
                            <ul className="mt-2 space-y-1">
                                {chapters.map((chapter) => (
                                    <li key={chapter.id}>
                                        <Link
                                            href={`/instructor/edit/1/chapter/${chapter.id}`} // TODO: Thay 123 bằng dynamic course ID nếu có
                                            className="block p-2 border rounded-md bg-gray-50 text-sm hover:bg-gray-100 transition"
                                        >
                                            {chapter.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* <div className="flex justify-between items-center">
                            <h2 className="font-semibold mb-2">Course Category</h2>
                            <Button variant="outline" size="sm">Upload resource</Button>
                        </div> */}
                        <div className="border p-4 rounded-md">
                            <h2 className="font-semibold mb-2">Course Category</h2>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="web">Web Development</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="border p-4 rounded-md flex justify-between items-center">
                            <h2 className="font-semibold mb-2">Course Price</h2>
                            <Input
                                className="w-30"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="e.g. 200,000"
                            />
                        </div>

                        <div className="border p-4 rounded-md">
                            <div className="flex justify-between items-center">
                                <h2 className="font-semibold mb-2">Resources & Attachments</h2>
                                <Button variant="outline" size="sm"><Upload />Upload resource</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
