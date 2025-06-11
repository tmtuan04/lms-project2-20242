"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface ApiReview {
  id: number;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewDialogProps {
  courseId: string;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewDialog = ({ courseId, userId, isOpen, onClose }: ReviewDialogProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExistingReview = async () => {
      try {
        const res = await fetch(`/api/reviews?courseId=${courseId}`);
        const data = await res.json();
        if (data.success) {
          const userReview = data.reviews.find((review: ApiReview) => review.userId === userId);
          if (userReview) {
            setRating(userReview.rating);
            setComment(userReview.comment);
          }
        }
      } catch (error) {
        console.error("Failed to fetch review:", error);
      }
    };

    if (isOpen) {
      fetchExistingReview();
    }
  }, [courseId, userId, isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          courseId,
          rating,
          comment,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate this Course</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">
              {rating} {rating === 1 ? 'star' : 'stars'}
            </span>
          </div>
          <Textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog; 