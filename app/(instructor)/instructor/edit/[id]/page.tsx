"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from "uuid"
import Link from "next/link";
import Image from "next/image";
import { TableOfContents, Image as ImageIcon, Edit, CheckCircle, CircleX } from "lucide-react"
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
    isEditing?: boolean;
};

export default function EditCoursePage() {
    // State cho từng trường
    const [title, setTitle] = useState("");
    const [titleConfirmed, setTitleConfirmed] = useState(false);

    const [description, setDescription] = useState("");
    const [descriptionConfirmed, setDescriptionConfirmed] = useState(false);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageConfirmed, setImageConfirmed] = useState(false);

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [chaptersConfirmed, setChaptersConfirmed] = useState(false);

    const [category, setCategory] = useState("");
    const [categoryConfirmed, setCategoryConfirmed] = useState(false);

    const [price, setPrice] = useState("");
    const [priceConfirmed, setPriceConfirmed] = useState(false);

    // Thêm state để theo dõi trạng thái edit của từng trường
    // const [isEditingTitle, setIsEditingTitle] = useState(false);
    // const [isEditingDescription, setIsEditingDescription] = useState(false);
    // const [isEditingCategory, setIsEditingCategory] = useState(false);
    // const [isEditingPrice, setIsEditingPrice] = useState(false);

    // Completed fields count
    const completedCount = [
        titleConfirmed,
        descriptionConfirmed,
        imageConfirmed,
        chaptersConfirmed,
        categoryConfirmed,
        priceConfirmed,
    ].filter(Boolean).length;

    // Image upload
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setImageConfirmed(false); // reset confirm nếu đổi ảnh
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1,
        maxSize: 2 * 1024 * 1024,
        disabled: imageConfirmed,
    });

    // Chapter logic
    const handleAddChapter = () => {
        setChapters([...chapters, { id: uuidv4(), title: "", isEditing: true }]);
        setChaptersConfirmed(false);
    };

    const handleChapterTitleChange = (id: string, value: string) => {
        setChapters(chapters.map(chap =>
            chap.id === id ? { ...chap, title: value } : chap
        ));
        setChaptersConfirmed(false);
    };

    const handleChapterEdit = (id: string) => {
        setChapters(chapters.map(chap =>
            chap.id === id ? { ...chap, isEditing: true } : chap
        ));
        setChaptersConfirmed(false);
    };

    const handleChapterConfirm = (id: string) => {
        setChapters(chapters.map(chap =>
            chap.id === id ? { ...chap, isEditing: false } : chap
        ));
    };

    const handleChapterDelete = (id: string) => {
        setChapters(chapters.filter(chap => chap.id !== id));
        setChaptersConfirmed(false);
    };

    // Confirm chapters khi tất cả chapter đều có tên và không còn đang edit
    const canConfirmChapters = chapters.length > 0 && chapters.every(chap => chap.title.trim() !== "" && !chap.isEditing);

    // Confirm buttons logic
    const canConfirmTitle = title.trim() !== "" && !titleConfirmed;
    const canConfirmDescription = description.trim() !== "" && !descriptionConfirmed;
    const canConfirmImage = !!imagePreview && !imageConfirmed;
    const canConfirmCategory = category !== "" && !categoryConfirmed;
    const canConfirmPrice = price.trim() !== "" && !priceConfirmed;

    // Thêm hàm để reset confirm và cho phép edit
    const handleEdit = (field: string) => {
        switch (field) {
            case 'title':
                setTitleConfirmed(false);
                break;
            case 'description':
                setDescriptionConfirmed(false);
                break;
            case 'image':
                setImageConfirmed(false);
                break;
            case 'category':
                setCategoryConfirmed(false);
                break;
            case 'price':
                setPriceConfirmed(false);
                break;
        }
    };

    return (
        <div>
            <div className="bg-yellow-100 p-4 text-sm text-yellow-700">
                This course is <span className="font-bold">unpublished</span>. It will not be visible to students.
            </div>

            <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">Course Setup</h1>
                        <p className="text-sm text-gray-800">
                            Completed all fields ({completedCount}/5)
                        </p>
                    </div>
                    <Button disabled={completedCount < 5}>Publish</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left panel */}
                    <div className="space-y-4">
                        {/* Title */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="font-semibold">Course Title</h2>
                                <div className="flex gap-2">
                                    {titleConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('title')}
                                        >
                                            <Edit />   Edit
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setTitleConfirmed(true)}
                                            disabled={!canConfirmTitle}
                                        >
                                            <CheckCircle /> Confirm
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <Input
                                value={title}
                                onChange={e => {
                                    setTitle(e.target.value);
                                    setTitleConfirmed(false);
                                }}
                                placeholder="Course Title"
                                className={titleConfirmed ? "font-semibold" : ""}
                            />
                        </div>

                        {/* Description */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="font-semibold">Course Description</h2>
                                <div className="flex gap-2">
                                    {descriptionConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('description')}
                                        >
                                            <Edit />    Edit
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setDescriptionConfirmed(true)}
                                            disabled={!canConfirmDescription}
                                        >
                                            <CheckCircle />   Confirm
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <Textarea
                                value={description}
                                onChange={e => {
                                    setDescription(e.target.value);
                                    setDescriptionConfirmed(false);
                                }}
                                placeholder="Course Description"
                                className={descriptionConfirmed ? "font-semibold" : ""}
                            />
                        </div>

                        {/* Image */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="flex items-center gap-2 font-semibold">
                                    <ImageIcon size={20} aria-hidden="true" />Course Image
                                </h2>
                                <div className="flex gap-2">
                                    {imageConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('image')}
                                        >
                                            <Edit />     Edit
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setImageConfirmed(true)}
                                            disabled={!canConfirmImage}
                                        >
                                            <CheckCircle />   Confirm
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div
                                {...getRootProps()}
                                className={`h-48 bg-gray-100 flex items-center justify-center rounded text-center cursor-pointer border-dashed border-2 border-gray-300 hover:border-gray-400 transition relative ${imageConfirmed ? "opacity-60" : ""}`}
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
                        {/* Chapters */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 font-semibold mb-2">
                                    <TableOfContents size={20} /> Course Chapters
                                </h2>
                                <Button variant="outline" size="sm" onClick={handleAddChapter}>+ Add a chapter</Button>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                {chapters.length === 0 ? "No chapters" : "Edit and confirm each chapter name"}
                            </div>
                            <ul className="mt-2 space-y-1">
                                {chapters.map((chapter) => (
                                    <li key={chapter.id} className="flex items-center gap-2">
                                        {chapter.isEditing ? (
                                            <>
                                                <Input
                                                    value={chapter.title}
                                                    onChange={e => handleChapterTitleChange(chapter.id, e.target.value)}
                                                    placeholder="Chapter name"
                                                    className="flex-1"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleChapterConfirm(chapter.id)}
                                                    disabled={chapter.title.trim() === ""}
                                                >
                                                <CheckCircle />    Confirm
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={`/instructor/edit/1/chapter/${chapter.id}`}
                                                    className="block flex-1 p-2 border rounded-md bg-gray-50 text-sm hover:bg-gray-100 transition"
                                                >
                                                    {chapter.title}
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleChapterEdit(chapter.id)}
                                                >
                                                <Edit />    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleChapterDelete(chapter.id)}
                                                >
                                                <CircleX />    Delete
                                                </Button>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className="mt-4"
                                variant="outline"
                                size="sm"
                                onClick={() => setChaptersConfirmed(true)}
                                disabled={!canConfirmChapters || chaptersConfirmed}
                            >
                            <CheckCircle />    Confirm Chapters
                            </Button>
                        </div>

                        {/* Category */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-semibold">Course Category</h2>
                                <div className="flex gap-2">
                                    {categoryConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('category')}
                                        >
                                        <Edit />    Edit
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCategoryConfirmed(true)}
                                            disabled={!canConfirmCategory}
                                        >
                                        <CheckCircle />    Confirm
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <Select
                                value={category}
                                onValueChange={value => {
                                    setCategory(value);
                                    setCategoryConfirmed(false);
                                }}
                            >
                                <SelectTrigger className={`w-full ${categoryConfirmed ? "font-semibold" : ""}`}>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="web">Web Development</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-semibold">Course Price</h2>
                                <div className="flex gap-2">
                                    {priceConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('price')}
                                        >
                                        <Edit />    Edit
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setPriceConfirmed(true)}
                                            disabled={!canConfirmPrice}
                                        >
                                        <CheckCircle />    Confirm
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <Input
                                className={`w-30 ${priceConfirmed ? "font-semibold" : ""}`}
                                value={price}
                                onChange={e => {
                                    setPrice(e.target.value);
                                    setPriceConfirmed(false);
                                }}
                                placeholder="e.g. 200,000"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}