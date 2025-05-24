"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Save, Video, Pencil, Eye, Trash2, ArrowLeft, FileText, Image as ImageIcon, Upload, Link as LinkIcon, Edit, CheckCircle, Link as LinkIconLucide } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useEditChapterStore } from "@/app/stores/editChapterStore";
// import { useParams } from 'next/navigation';
// import { useMemo } from 'react';

export default function ChapterDetailPage() {
    // Get state and actions from store
    const {
        title,
        titleConfirmed,
        description,
        descriptionConfirmed,
        videoFile,
        videoUrl,
        videoPreview,
        isEditingVideo,
        videoConfirmed,
        documents,
        documentLink,
        documentName,
        documentsConfirmed,
        accessMode,
        accessConfirmed,
        setTitle,
        setTitleConfirmed,
        setDescription,
        setDescriptionConfirmed,
        setVideoFile,
        setVideoUrl,
        setVideoPreview,
        setIsEditingVideo,
        setVideoConfirmed,
        setDocumentLink,
        setDocumentName,
        setDocumentsConfirmed,
        addDocument,
        removeDocument,
        setAccessMode,
        setAccessConfirmed,
    } = useEditChapterStore();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            const previewUrl = URL.createObjectURL(file);
            setVideoPreview(previewUrl);
            setIsEditingVideo(false);
            setVideoConfirmed(false);
            setVideoUrl('');
        }
    }, [setVideoFile, setVideoPreview, setIsEditingVideo, setVideoConfirmed, setVideoUrl]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.webm', '.ogg']
        },
        maxFiles: 1
    });

    const handleVideoLink = () => {
        if (videoUrl) {
            setVideoPreview(videoUrl);
            setVideoFile(null);
            setIsEditingVideo(false);
            setVideoConfirmed(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                    const fileUrl = URL.createObjectURL(file);
                    addDocument({
                        name: file.name,
                        type: file.type,
                        url: fileUrl
                    });
                }
            });
        }
    };

    const convertYoutubeUrlToEmbed = (url: string) => {
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
        const match = url.match(youtubeRegex);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
        return url;
    };

    const handleAddDocument = () => {
        if (documentLink) {
            let type = 'link';
            if (documentLink.endsWith('.pdf')) type = 'application/pdf';
            else if (/\.(jpg|jpeg|png|gif)$/i.test(documentLink)) type = 'image';
            const fileName = documentName.trim() || documentLink.split('/').pop() || 'Document';
            addDocument({
                name: fileName,
                type,
                url: documentLink
            });
            setDocumentLink('');
            setDocumentName('');
        }
    };

    // Confirm conditions
    const canConfirmTitle = title.trim() !== "" && !titleConfirmed;
    const canConfirmDescription = description.trim() !== "" && !descriptionConfirmed;
    const canConfirmDocuments = documents.length > 0 && !documentsConfirmed;
    const canConfirmVideo = (videoPreview || videoUrl) && !videoConfirmed;

    // Edit handlers
    const handleEdit = (field: string) => {
        switch (field) {
            case 'title':
                setTitleConfirmed(false);
                break;
            case 'description':
                setDescriptionConfirmed(false);
                break;
            case 'video':
                setIsEditingVideo(true);
                setVideoConfirmed(false);
                break;
            case 'documents':
                setDocumentsConfirmed(false);
                break;
            case 'access':
                setAccessConfirmed(false);
                break;
        }
    };

    // Completed fields count
    const completedCount = [
        titleConfirmed,
        descriptionConfirmed,
        videoConfirmed,
        documentsConfirmed,
        accessConfirmed,
    ].filter(Boolean).length;

    return (
        <div className="p-5 space-y-3">
            <Link href="/instructor/edit/1">
                <div className="inline-flex items-center gap-2 hover:bg-gray-100 rounded-md p-1 cursor-pointer mb-2">
                    <ArrowLeft size={16} />Back to course setup
                </div>
            </Link>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Chapter Creation</h1>
                <div className="flex gap-2">
                    <Button variant="outline"><Save />Save</Button>
                    <Button variant="destructive"><Trash2 size={16} /></Button>
                </div>
            </div>

            <p className="text-sm text-gray-500">
                Completed all fields ({completedCount}/5)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side */}
                <div className="space-y-6">
                    {/* Title */}
                    <section className="border p-4 rounded-md">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-medium">Chapter Title</h2>
                            <div className="flex gap-2">
                                {titleConfirmed ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit('title')}
                                    >
                                        <Edit /> Edit
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
                            onChange={(e) => setTitle(e.target.value)}
                            className={titleConfirmed ? "font-medium" : ""}
                        />
                    </section>

                    {/* Description */}
                    <section className="border p-4 rounded-md">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-medium">Chapter Description</h2>
                            <div className="flex gap-2">
                                {descriptionConfirmed ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit('description')}
                                    >
                                        <Edit /> Edit
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDescriptionConfirmed(true)}
                                        disabled={!canConfirmDescription}
                                    >
                                        <CheckCircle /> Confirm
                                    </Button>
                                )}
                            </div>
                        </div>
                        <Textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={descriptionConfirmed ? "font-medium" : ""}
                        />
                    </section>

                    {/* Documents Section */}
                    <section className="border p-4 rounded-md">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-medium flex items-center gap-2">
                                <FileText size={18} /> Chapter Documents
                            </h2>
                            <div className="flex gap-2">
                                {documentsConfirmed ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit('documents')}
                                    >
                                        <Edit /> Edit
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDocumentsConfirmed(true)}
                                        disabled={!canConfirmDocuments}
                                    >
                                        <CheckCircle /> Confirm
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Documents Upload Section - Only show when not confirmed */}
                        {!documentsConfirmed && (
                            <div className="space-y-5">
                                {/* File Upload */}
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600 ml-1 mb-2">Upload from device</p>
                                    <div className="flex gap-2">
                                        <Input
                                            type="file"
                                            accept=".pdf,image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="file-upload"
                                            multiple
                                        />
                                        <label htmlFor="file-upload">
                                            <Button variant="outline" className="w-full" asChild>
                                                <span>
                                                    <Upload size={16} className="mr-2" />
                                                    Upload Files
                                                </span>
                                            </Button>
                                        </label>
                                    </div>
                                </div>

                                {/* Link Input */}
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600 ml-1 mb-2">Or image/pdf url</p>
                                    <Input
                                        placeholder="Document name (optional)"
                                        value={documentName}
                                        onChange={(e) => setDocumentName(e.target.value)}
                                        className="w-full"
                                    />
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Or add document link (PDF or Image URL)"
                                            value={documentLink}
                                            onChange={(e) => setDocumentLink(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button onClick={handleAddDocument}>
                                            <LinkIcon size={16} className="mr-2" />
                                            Add Link
                                        </Button>
                                    </div>
                                </div>

                                {/* Documents List */}
                                <div className="space-y-2">
                                    {documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                            <div className="flex items-center gap-2">
                                                {doc.type === 'application/pdf' ? (
                                                    <FileText size={16} className="text-red-500" />
                                                ) : doc.type === 'image' ? (
                                                    <ImageIcon size={16} className="text-blue-500" />
                                                ) : (
                                                    <LinkIconLucide size={16} className="text-gray-500" />
                                                )}
                                                <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeDocument(index)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Confirmed Documents List */}
                        {documentsConfirmed && (
                            <div className="space-y-2">
                                {documents.map((doc, index) => (
                                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
                                        <div className="flex items-center gap-2">
                                            {doc.type === 'application/pdf' ? (
                                                <FileText size={16} className="text-red-500" />
                                            ) : doc.type === 'image' ? (
                                                <ImageIcon size={16} className="text-blue-500" />
                                            ) : (
                                                <LinkIconLucide size={16} className="text-gray-500" />
                                            )}
                                            <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Side */}
                <div className="space-y-6">
                    {/* Video Section */}
                    <section className="border p-4 rounded-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-medium flex items-center gap-2">
                                <Video size={18} /> Chapter Video
                            </h2>
                            <div className="flex gap-2">
                                {videoConfirmed ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit('video')}
                                    >
                                        <Edit /> Edit
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setVideoConfirmed(true)}
                                        disabled={!canConfirmVideo}
                                    >
                                        <CheckCircle /> Confirm
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Upload section only if editing or no video */}
                        {(!videoPreview || isEditingVideo) && (
                            <>
                                {/* Video Upload Dropzone */}
                                <div 
                                    {...getRootProps()} 
                                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                                        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                                >
                                    <input {...getInputProps()} />
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload size={24} className="text-gray-400" />
                                        {isDragActive ? (
                                            <p className="text-sm text-gray-600">Drop the video here...</p>
                                        ) : (
                                            <div className="text-sm text-gray-600">
                                                <p>Drag and drop a video file here, or click to select</p>
                                                <p className="text-xs text-gray-400 mt-1">Supports MP4, WebM, OGG</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Video Link Input */}
                                <div className="mt-4">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Or paste video URL here"
                                            value={videoUrl}
                                            onChange={(e) => setVideoUrl(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button onClick={handleVideoLink}>
                                            <LinkIcon size={16} className="mr-2" />
                                            Add Link
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Video Preview */}
                        {videoPreview && !isEditingVideo && (
                            <div className="mt-4">
                                {videoPreview.includes("youtube.com") || videoPreview.includes("youtu.be") ? (
                                    <div className="aspect-w-16 aspect-h-9 w-full rounded-md overflow-hidden">
                                        <iframe
                                            src={convertYoutubeUrlToEmbed(videoPreview)}
                                            title="YouTube video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full border-none"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <video controls className="w-full rounded-md" src={videoPreview}>
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-sm text-gray-600">
                                        {videoFile ? `File: ${videoFile.name}` : 'Video URL added'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Access Settings */}
                    <section className="border p-4 rounded-md">
                        <h2 className="font-medium flex items-center justify-between">
                            <span className="flex items-center gap-2"><Eye size={16} /> Access Settings</span>
                            {accessConfirmed ? (
                                <Button variant="ghost" size="sm" onClick={() => setAccessConfirmed(false)}>
                                    <Pencil size={16} className="mr-1" /> Edit access settings
                                </Button>
                            ) : (
                                <Button variant="outline" size="sm" onClick={() => setAccessConfirmed(true)}>
                                    <CheckCircle className="mr-1" /> Confirm
                                </Button>
                            )}
                        </h2>
                        <div className="flex items-center space-x-2 mt-2">
                            <span className="text-sm">Free Preview Chapter: </span>
                            {accessConfirmed ? (
                                <span className="font-medium text-sm">
                                    {accessMode === 'free' ? 'Free' : 'Locked'}
                                </span>
                            ) : (
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="accessMode"
                                            value="free"
                                            checked={accessMode === 'free'}
                                            onChange={() => setAccessMode('free')}
                                        />
                                        <span className="text-sm">Free</span>
                                    </label>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="accessMode"
                                            value="locked"
                                            checked={accessMode === 'locked'}
                                            onChange={() => setAccessMode('locked')}
                                        />
                                        <span className="text-sm">Locked</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
