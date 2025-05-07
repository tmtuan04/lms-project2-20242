"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Video, Pencil, Eye, Trash2, ArrowLeft } from "lucide-react";

export default function ChapterDetailPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(``);
    // const [isFreePreview, setIsFreePreview] = useState(true);

    return (
        <div className="p-5 space-y-4">
            <Link href="/instructor/edit/1"><div className="inline-flex items-center gap-2 hover:bg-gray-100 rounded-md p-1 cursor-pointer"><ArrowLeft size={16} />Back to course setup</div></Link>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Chapter creation</h1>
                <div className="flex gap-2">
                    <Button variant="outline">Unpublish</Button>
                    <Button variant="destructive"><Trash2 size={16} /></Button>
                </div>
            </div>

            <p className="text-sm text-gray-500">Complete all fields (0/3)</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side */}
                <div className="space-y-6">
                    {/* Title */}
                    <section className="border p-4 rounded-md">
                        <h2 className="font-semibold flex items-center justify-between mb-2">
                            Chapter title
                            <Button variant="ghost" size="sm"><Pencil size={16} className="mr-1" /> Edit title</Button>
                        </h2>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </section>

                    {/* Description */}
                    <section className="border p-4 rounded-md">
                        <h2 className="font-semibold flex items-center justify-between mb-2">
                            Chapter description
                            <Button variant="ghost" size="sm"><Pencil size={16} className="mr-1" /> Edit description</Button>
                        </h2>
                        <Textarea
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </section>

                    {/* Access Settings */}
                    <section className="border p-4 rounded-md">

                        <h2 className="font-semibold flex items-center justify-between">
                            <span className="flex items-center gap-2"><Eye size={16} /> Access Settings</span>
                            <Button variant="ghost" size="sm"><Pencil size={16} className="mr-1" /> Edit access settings</Button>
                        </h2>
                        <div className="flex items-center space-x-2 mt-2">

                            <span className="text-sm">Free Preview Chapter: </span>
                            <span className="font-medium text-sm">Enabled</span>
                        </div>
                    </section>
                </div>

                {/* Right Side */}
                <div className="space-y-6">
                    <section className="border p-4 rounded-md">
                        <h2 className="font-semibold flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Video size={18} /> Chapter video
                            </div>
                            <Button variant="ghost" size="sm"><Pencil size={16} className="mr-1" /> Edit video</Button>
                        </h2>
                        <video
                            controls
                            className="w-full mt-3 rounded-md"
                            src="/" // Replace with actual video src
                        >
                            Your browser does not support the video tag.
                        </video>
                        <p className="text-xs text-gray-400 mt-2">Videos can take a few minutes to process. Refresh the page if the video doesn`t appear.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
