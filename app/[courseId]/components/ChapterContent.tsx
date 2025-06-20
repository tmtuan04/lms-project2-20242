"use client";

import { useUserStore } from "@/app/stores/useUserStore";
import { useEffect, useState } from "react";
import { checkUserEnrolled } from "@/app/lib/data";
import { toggleChapterProgress, getChapterProgress } from "@/app/lib/actions/chapterProgressActions";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { useProgressStore } from "@/app/stores/useProgressStore";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set worker URL
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.mjs`;

type Attachment = {
  id: string;
  name: string;
  url: string;
};

type ChapterType = {
  id: string;
  title: string;
  description?: string | undefined;
  videoUrl: string | null;
  isLocked: boolean;
  attachments: Attachment[] | null;
};

interface ChapterContentProps {
  chapter: ChapterType;
  courseId: string;
  courseChapters: ChapterType[];
}

export default function ChapterContent({ chapter, courseId, courseChapters }: ChapterContentProps) {
  const { user } = useUserStore();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChapterLoading, setIsChapterLoading] = useState(true);
  const setCompletedInStore = useProgressStore((state) => state.setCompleted);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isEnrolledLoading, setIsEnrolledLoading] = useState(true);

  // Review
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) {
        setIsChapterLoading(false);
        setIsEnrolledLoading(false);
        return;
      }

      setIsChapterLoading(true);
      setIsEnrolledLoading(true);

      const enrolled = await checkUserEnrolled(courseId, user.id);
      setIsEnrolled(enrolled);

      const progress = await getChapterProgress(chapter.id, user.id);
      setIsCompleted(progress?.isCompleted ?? false);

      setIsChapterLoading(false);
      setIsEnrolledLoading(false);
    };

    loadData();
  }, [user?.id, courseId, chapter.id]);

  if (!user?.id) {
    return (
      <div className="bg-blue-100 p-4 text-sm text-blue-700">
        Please <span className="font-bold">log in</span> to view this content.
      </div>
    );
  }

  const checkAllChaptersCompleted = async () => {
    if (!user?.id) return false;
    const progressList = await Promise.all(
      courseChapters.map((chap) => getChapterProgress(chap.id, user.id))
    );
    return progressList.every((progress) => progress?.isCompleted);
  };

  const handleToggleComplete = async () => {
    if (!user?.id) {
      toast.error("Please login to mark chapters as complete");
      return;
    }
    try {
      setIsLoading(true);
      const progress = await toggleChapterProgress(chapter.id, user.id);
      setIsCompleted(progress.isCompleted);
      setCompletedInStore(chapter.id, progress.isCompleted);
      toast.success(progress.isCompleted ? "Chapter marked as complete!" : "Chapter marked as incomplete");
      if (progress.isCompleted) {
        const allCompleted = await checkAllChaptersCompleted();
        if (allCompleted) {

          // Bắn pháo hoa + Modal Review
          const bigCelebration = () => {
            let count = 0;
            const maxCount = 6;
            const interval = 350;
            const timer = setInterval(() => {
              confetti({
                particleCount: 150,
                spread: 100,
                origin: { x: Math.random(), y: Math.random() * 0.6 + 0.2 },
                gravity: 0.8,
                ticks: 300
              });
              count++;
              if (count >= maxCount) {
                clearInterval(timer);
                // Mở modal sau khi pháo hoa xong
                setTimeout(() => {
                  setShowReviewModal(true);
                }, 1500);
              }
            }, interval);
          };
          bigCelebration();
          toast.success("Congrats! You've finished the course!", { duration: 5000, position: "bottom-center" });
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update progress");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEnrolledLoading || isChapterLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="aspect-video w-full rounded-md" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  const chapterIsLocked = !isEnrolledLoading && chapter.isLocked && !isEnrolled;

  if (chapterIsLocked) {
    return (
      <div className="bg-yellow-100 p-4 text-sm text-yellow-700">
        This chapter is <span className="font-bold">locked</span>. Please enroll the course to continue learning.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {chapter.videoUrl && (
        <div className="aspect-video">
          <video
            src={chapter.videoUrl}
            controls
            className="w-full h-full rounded-md object-cover"
          />
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-xl font-bold">{chapter.title}</h2>
        {isEnrolled && (
          <Button
            onClick={handleToggleComplete}
            disabled={isLoading}
            className={`flex items-center gap-2 ${isCompleted
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-secondary text-black hover:bg-secondary/80"
              }`}
          >
            <CheckCircle2 className={isCompleted ? "text-white" : "text-green-600"} />
            {isCompleted ? "Completed" : "Mark as Complete"}
          </Button>
        )}
      </div>
      <p className="text-slate-600 mt-2">{chapter.description}</p>

      {chapter.attachments && chapter.attachments.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Attachments:</h3>
          <ul className="space-y-6">
            {chapter.attachments.map((file, index) =>
              file.url.endsWith(".pdf") ? (
                <li key={file.id} className="border rounded-md overflow-hidden">
                  <div className="p-2 font-semibold">{index + 1}. {file.name}</div>
                  <div className="h-[600px] overflow-auto border-t">
                    <Document
                      file={file.url}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      onLoadError={(err) => {
                        console.error("Failed to load PDF:", err);
                        toast.error("Không thể tải file PDF");
                      }}
                      className="p-2"
                    >
                      {numPages &&
                        Array.from({ length: numPages }, (_, i) => (
                          <Page
                            key={`page_${i + 1}`}
                            pageNumber={i + 1}
                            width={800}
                          />
                        ))}
                    </Document>
                  </div>
                </li>
              ) : (
                <li key={file.id}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {file.name}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      )}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Course Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <RadioGroup value={rating} onValueChange={setRating} className="flex gap-4">
              {["1", "2", "3", "4", "5"].map((val) => (
                <div key={val} className="flex items-center space-x-2">
                  <RadioGroupItem value={val} id={`rating-${val}`} />
                  <label htmlFor={`rating-${val}`}>{val} star{val !== "1" ? "s" : ""}</label>
                </div>
              ))}
            </RadioGroup>
            <Textarea
              placeholder="Write your feedback here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={async () => {
                if (!user?.id) return;
                try {
                  setIsSubmittingReview(true);
                  const res = await fetch("/api/reviews", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      userId: user.id,
                      courseId,
                      rating: parseInt(rating),
                      comment,
                    }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    toast.success("Thank you for your feedback!");
                    setShowReviewModal(false);
                    setRating("5");
                    setComment("");
                  } else {
                    toast.error(data.message || "Failed to submit review.");
                  }
                } catch (err) {
                  console.error(err);
                  toast.error("Error while submitting review");
                } finally {
                  setIsSubmittingReview(false);
                }
              }}
              disabled={isSubmittingReview}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}