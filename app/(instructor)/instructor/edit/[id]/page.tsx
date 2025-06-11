"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from "uuid"
import Link from "next/link";
import Image from "next/image";
import { TableOfContents, Image as ImageIcon, CheckCircle, Trash2, Pencil, Loader2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEditCourseStore } from "@/app/stores/editCourseStore";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourseByID, fetchCategories } from "@/app/lib/data";
import { Category } from "@/app/lib/definitions";

import { updateCourse, publishCourse } from "@/app/lib/actions/coursesActions";
import { useUserStore } from "@/app/stores/useUserStore";
import { toast } from "react-hot-toast";

// Sửa lại fetch user từ zustand luôn ở đây

export default function EditCoursePage() {
    const user = useUserStore((s) => s.user)
    const resetStore = useEditCourseStore((s) => s.resetStore);
    const params = useParams();
    const router = useRouter();

    // Get state and actions from store
    const {
        title,
        titleConfirmed,
        description,
        descriptionConfirmed,
        imagePreview,
        imageConfirmed,
        category,
        categoryConfirmed,
        price,
        priceConfirmed,
        chapters,
        chaptersConfirmed,
        setTitle,
        setTitleConfirmed,
        setDescription,
        setDescriptionConfirmed,
        setImagePreview,
        setImageConfirmed,
        setCategory,
        setCategoryConfirmed,
        setPrice,
        setPriceConfirmed,
        addChapter,
        updateChapter,
        deleteChapter,
        setChaptersConfirmed,
    } = useEditCourseStore();

    const [categories, setCategories] = useState<Category[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isPublished, setIsPublished] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        };

        loadCategories();
    }, []);

    // Fetch course data on mount
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseId = params.id as string;
                const courseData = await getCourseByID(courseId);
                console.log("Course Data from DB:", courseData);
                // Reset chapters before adding new ones
                resetStore();
                setIsPublished(courseData.isPublished);

                // Update store with fetched data
                setTitle(courseData.title);
                setTitleConfirmed(true);
                setPrice(courseData.price.toString());
                setPriceConfirmed(true);

                setDescription(courseData.description ?? "");
                setDescriptionConfirmed(!!courseData.description);

                setCategory(courseData.categoryId ?? "");
                setCategoryConfirmed(!!courseData.categoryId);

                setImagePreview(courseData.imageUrl ?? "");
                setImageConfirmed(!!courseData.imageUrl);

                // Add existing chapters to store with unique IDs
                if (courseData.chapters && courseData.chapters.length > 0) {
                    // Sort chapters by their original order if needed
                    const sortedChapters = [...courseData.chapters].sort((a, b) => {
                        return a.order - b.order;
                    });

                    console.log("Sorted Chapters for Store:", sortedChapters);

                    sortedChapters.forEach(chapter => {
                        addChapter({
                            id: chapter.id, // Use the original chapter ID from database
                            title: chapter.title,
                            order: chapter.order,
                            isEditing: false
                        });
                    });
                    setChaptersConfirmed(true);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                toast.error("Failed to load course data");
            }
        };

        fetchCourse();
    }, [
        params.id,
        setTitle,
        setTitleConfirmed,
        setPrice,
        setPriceConfirmed,
        setDescription,
        setDescriptionConfirmed,
        setCategory,
        setCategoryConfirmed,
        setImagePreview,
        setImageConfirmed,
        addChapter,
        setChaptersConfirmed,
        resetStore
    ]);

    const [imageFile, setImageFile] = useState<File | null>(null);

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
            setImageFile(file); // Lưu file gốc
        }
    }, [setImagePreview]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1,
        maxSize: 2 * 1024 * 1024,
        disabled: imageConfirmed,
    });

    // Chapter logic
    const handleAddChapter = () => {
        // Generate a new unique ID for new chapters
        const newChapterId = uuidv4();
        addChapter({
            id: newChapterId,
            title: "",
            order: chapters.length, // Assign a temporary order for new chapters
            isEditing: true
        });
    };

    const handleChapterTitleChange = (id: string, value: string) => {
        updateChapter(id, { title: value });
    };

    const handleChapterEdit = (id: string) => {
        updateChapter(id, { isEditing: true });
    };

    const handleChapterConfirm = (id: string) => {
        updateChapter(id, { isEditing: false });
    };

    const handleChapterDelete = (id: string) => {
        deleteChapter(id);
    };

    // Confirm chapters khi tất cả chapter đều có tên và không còn đang edit
    const canConfirmChapters = chapters.length > 0 && chapters.every(chap => chap.title.trim() !== "" && !chap.isEditing);

    // Confirm buttons logic
    const canConfirmTitle = title.trim() !== "" && !titleConfirmed;
    const canConfirmDescription = description !== "" && !descriptionConfirmed;
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

    const handlePublish = async () => {
        try {
            await toast.promise(
                publishCourse({ courseId: params.id as string }),
                {
                    loading: "Publishing course...",
                    success: "Course published successfully!",
                    error: "Failed to publish course.",
                }
            );
            setIsPublished(true); // Update state after successful publish
            router.refresh(); // Still refresh server components
        } catch (error) {
            console.error("Error publishing course:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            setIsUpdating(true);

            let imageUrlToUse = imagePreview || ""; // Use existing image preview if no new file

            if (imageFile) {
                // If a new image file is selected, upload it
                imageUrlToUse = await uploadImageToCloudinary(imageFile);
            } else if (!imageUrlToUse) {
                // If no new file and no existing image, show error
                toast.error("Image not found");
                setIsUpdating(false);
                return;
            }

            if (!user?.id) {
                toast.error("User not found");
                setIsUpdating(false);
                return;
            }

            // Lấy danh sách title của chapter
            const chapterTitles = chapters.map((c) => c.title);

            // Gọi server action cập nhật khoá học
            await updateCourse({
                courseId: params.id as string,
                title,
                description,
                imageUrl: imageUrlToUse,
                price,
                categoryId: category || "",
                chapters: chapterTitles,
                instructorId: user.id,
            });

            // Reset store
            resetStore();
            toast.success("Update course successful");
        } catch (error) {
            const err = error as Error
            console.error("Error update course", err.message);
            toast.error("Error update course")
        } finally {
            setIsUpdating(false);
        }
    };

    async function uploadImageToCloudinary(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        return data.secure_url; // Cloudinary trả về secure_url
    }

    return (
        // Div này để responsive
        <div>
            {!isPublished && (
                <div className="flex bg-yellow-100 p-4 text-sm text-yellow-700 justify-between items-center">
                    <span>
                        This course is <span className="font-bold">unpublished</span>. It will not be visible to students.
                    </span>
                    <Button
                        className="text-black"
                        onClick={handlePublish}
                        variant="outline"
                    >
                        Publish Course
                    </Button>
                </div>
            )}

            <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">Course Setup</h1>
                        <p className="text-sm text-gray-800">
                            Completed all fields ({completedCount}/6)
                        </p>
                    </div>
                    <Button
                        disabled={completedCount < 6 || isUpdating}
                        onClick={handleUpdate}
                    >
                        {isUpdating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Update Course"
                        )}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left panel */}
                    <div className="space-y-4">
                        {/* Title */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="font-medium">Course Title</h2>
                                <div className="flex gap-2">
                                    {titleConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('title')}
                                        >
                                            <Pencil />   Edit
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
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Course Title"
                                className={titleConfirmed ? "font-medium" : ""}
                            />
                        </div>

                        {/* Description */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="font-medium">Course Description</h2>
                                <div className="flex gap-2">
                                    {descriptionConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('description')}
                                        >
                                            <Pencil />    Edit
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
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Course Description"
                                className={descriptionConfirmed ? "font-medium" : ""}
                            />
                        </div>

                        {/* Image */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="flex items-center gap-2 font-medium">
                                    <ImageIcon size={20} aria-hidden="true" />Course Image
                                </h2>
                                <div className="flex gap-2">
                                    {imageConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('image')}
                                        >
                                            <Pencil />     Edit
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
                                className={`relative h-48 w-full bg-gray-100 flex items-center justify-center rounded text-center cursor-pointer border-dashed border-2 border-gray-300 hover:border-gray-400 transition ${imageConfirmed ? "opacity-60" : ""}`}
                            >
                                <input {...getInputProps()} />
                                {imagePreview ? (
                                    <Image
                                        fill
                                        src={imagePreview}
                                        alt="Course Preview"
                                        className="object-contain rounded"
                                    />
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
                                <h2 className="flex items-center gap-2 font-medium mb-2">
                                    <TableOfContents size={20} /> Course Chapters
                                </h2>
                                <Button variant="outline" size="sm" onClick={handleAddChapter}>+ Add a chapter</Button>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                {chapters.length === 0 ? "No chapters" : "Edit and confirm each chapter name"}
                            </div>
                            <ul className="mt-2 space-y-1">
                                {chapters.map((chapter, index) => (
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
                                                    href={`/instructor/edit/chapter/${chapter.id}`}
                                                    className="block flex-1 p-2 border rounded-md bg-gray-50 text-sm hover:bg-gray-100 transition"
                                                >
                                                    {index}. {chapter.title}
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleChapterEdit(chapter.id)}
                                                >
                                                    <Pencil />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleChapterDelete(chapter.id)}
                                                >
                                                    <Trash2 />
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
                                <h2 className="font-medium">Course Category</h2>
                                <div className="flex gap-2">
                                    {categoryConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('category')}
                                        >
                                            <Pencil />    Edit
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
                                onValueChange={value => setCategory(value)}
                            >
                                <SelectTrigger className={`w-full ${categoryConfirmed ? "font-medium" : ""}`}>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price */}
                        <div className="border p-4 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-medium">Course Price (đ)</h2>
                                <div className="flex gap-2">
                                    {priceConfirmed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit('price')}
                                        >
                                            <Pencil />    Edit
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
                                className={`w-30 ${priceConfirmed ? "font-medium" : ""}`}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="e.g. 200,000"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}