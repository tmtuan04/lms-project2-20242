'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, ThumbsUp, MessageCircle, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea";
import { Review, CourseData } from '@/app/lib/definitions';
import { useParams } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link';

const fallbackCourse: CourseData = {
  title: 'Updating...',
  description: 'No description available for this course.',
  category: "Fullstack Web",
  instructor: {
    name: 'Unknown instructor',
    imageUrl: '/avatar.png',
  },
  enrolled: '0',
  chapters: '0',
  rating: '0.0',
  reviews: '0',
  level: 'Beginner level',
  levelDescription: 'No prior experience required',
  schedule: 'Flexible schedule',
  scheduleDetails: '2 months, 10 hours a week',
  pace: 'Learn at your own pace',
  imageUrl: '/default-logo.png',
  createdAt: new Date().toISOString(),
};

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user: {
        name: 'John Doe',
        imageUrl: '/avatar.png',
      },
      rating: 5,
      comment: 'This course is excellent! The instructor explains everything clearly and the content is well-structured. Highly recommended for beginners.',
      timestamp: '2024-03-15T10:30:00',
      likes: 12,
      comments: [
        {
          id: 1,
          user: {
            name: 'Jane Smith',
            imageUrl: '/avatar.png',
          },
          comment: 'I agree! The practical exercises are really helpful.',
          timestamp: '2024-03-15T11:00:00'
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Alice Johnson',
        imageUrl: '/avatar.png',
      },
      rating: 4,
      comment: 'Great course material and good pace. The only suggestion would be to add more advanced topics.',
      timestamp: '2024-03-14T15:45:00',
      likes: 8,
      comments: []
    },
    {
      id: 3,
      user: {
        name: 'Mike Wilson',
        imageUrl: '/avatar.png',
      },
      rating: 5,
      comment: 'The best course I\'ve taken so far. The instructor is very knowledgeable and responsive to questions.',
      timestamp: '2024-03-13T09:20:00',
      likes: 15,
      comments: [
        {
          id: 2,
          user: {
            name: 'Sarah Brown',
            imageUrl: '/avatar.png',
          },
          comment: 'Couldn\'t agree more! The community support is amazing too.',
          timestamp: '2024-03-13T10:15:00'
        },
        {
          id: 3,
          user: {
            name: 'David Lee',
            imageUrl: '/avatar.png',
          },
          comment: 'The practice projects are really well designed.',
          timestamp: '2024-03-13T11:30:00'
        }
      ]
    }
  ]);
  const reviewSectionRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        const data = await res.json();

        // Log
        console.log("Data:", data);

        if (!res.ok || !data || typeof data !== 'object') {
          setCourseData(fallbackCourse);
          return;
        }

        // Replace invalid/empty values with fallback
        const filledCourse: CourseData = {
          title: data.title || fallbackCourse.title,
          description: data.description || fallbackCourse.description,
          category: data.category || fallbackCourse.category,
          instructor: {
            name: data.instructor?.name || fallbackCourse.instructor.name,
            imageUrl: data.instructor?.imageUrl || fallbackCourse.instructor.imageUrl,
          },
          enrolled: data.enrolled || fallbackCourse.enrolled,
          chapters: data.chapters || fallbackCourse.chapters,
          rating: data.rating || fallbackCourse.rating,
          reviews: data.reviews || fallbackCourse.reviews,
          level: data.level || fallbackCourse.level,
          levelDescription: data.levelDescription || fallbackCourse.levelDescription,
          schedule: data.schedule || fallbackCourse.schedule,
          scheduleDetails: data.scheduleDetails || fallbackCourse.scheduleDetails,
          pace: data.pace || fallbackCourse.pace,
          imageUrl: data.imageUrl || fallbackCourse.imageUrl,
          createdAt: data.createdAt || fallbackCourse.createdAt,
        };

        setCourseData(filledCourse);
      } catch (error) {
        console.error("Failed to fetch course data:", error);
        setCourseData(fallbackCourse);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, reviews]);

  const [newComment, setNewComment] = useState('');
  const [activeReview, setActiveReview] = useState<number | null>(null);

  const handleLike = (reviewId: number) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, likes: review.likes + 1 }
        : review
    ));
  };

  const handleComment = (reviewId: number) => {
    if (!newComment.trim()) return;

    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          comments: [...review.comments, {
            id: Date.now(),
            user: {
              name: 'Current User',
              imageUrl: '/avatar.png',
            },
            comment: newComment,
            timestamp: new Date().toISOString()
          }]
        };
      }
      return review;
    }));

    setNewComment('');
    setActiveReview(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCourseDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="bg-[#f7f9fc] py-12 px-6">
        {/* Top Section Skeleton */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <Skeleton className="w-[200px] h-[300px] rounded-2xl mb-4 md:mb-0 md:mr-8" />
          <div className="text-center md:text-left w-full md:w-auto">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <Skeleton className="h-4 w-32 mb-2 md:mb-0" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        {/* Description Skeleton */}
        <Skeleton className="h-20 w-full mb-6" />

        {/* Info Box Skeleton */}
        <div className="bg-white rounded-2xl shadow-md px-8 py-6 flex flex-col md:flex-row justify-between items-center text-center mb-10">
          <div className="mb-4 md:mb-0">
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="mb-5 md:mb-0">
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="mb-4 md:mb-1">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="mb-4 md:mb-1">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-40 mb-1" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>

        {/* Navigation Buttons Skeleton */}
        <div className="flex justify-center space-x-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Reviews Section Skeleton */}
        <div className="mt-20">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white shadow rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Skeleton key={star} className="w-4 h-4" />
                          ))}
                        </div>
                      </div>
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-16 w-full mt-2" />
                    <div className="flex items-center gap-4 mt-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f9fc] py-12 px-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center mb-6">
        <Image
          src={courseData?.imageUrl ?? fallbackCourse.imageUrl}
          alt="Course Logo"
          width={250}
          height={400}
          className="rounded-2xl mb-4 md:mb-0 md:mr-8"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{courseData?.title ?? fallbackCourse.title}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <Image
              src={courseData?.instructor?.imageUrl ?? fallbackCourse.instructor.imageUrl}
              alt="Instructor"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <span className="text-sm font-semibold text-gray-800">
                Instructor:{' '}
                <a href="#" className="underline">
                  {courseData?.instructor?.name ?? fallbackCourse.instructor.name}
                </a>
              </span>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Created: {formatCourseDate(courseData?.createdAt ?? fallbackCourse.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Category:</span>{' '}
              <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {courseData?.category ?? fallbackCourse.category}
              </span>
            </p>
            <p className="text-sm text-gray-800 font-semibold">
              {courseData?.enrolled ?? fallbackCourse.enrolled} already enrolled
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-800 mb-6"><span className='font-bold'>Description</span>: {courseData?.description ?? fallbackCourse.description}</p>

      {/* Info Box */}
      <div className="bg-white rounded-2xl shadow-md px-8 py-6 flex flex-col md:flex-row justify-between items-center text-center mb-10">
        <div className="mb-4 md:mb-0">
          <p className="font-semibold underline">{courseData?.chapters ?? fallbackCourse.chapters} chapters</p>
        </div>
        <div className="mb-5 md:mb-0">
          <p className="font-bold text-lg">{courseData?.rating ?? fallbackCourse.rating} ⭐</p>
          <p className="text-sm text-gray-600">({courseData?.reviews ?? fallbackCourse.reviews} reviews)</p>
        </div>
        <div className="mb-4 md:mb-1">
          <p className="font-bold md:mb-1">{courseData?.level ?? fallbackCourse.level}</p>
          <p className="text-sm text-gray-600">{courseData?.levelDescription ?? fallbackCourse.levelDescription}</p>
        </div>
        <div className="mb-4 md:mb-1">
          <p className="font-bold md:mb-1">{courseData?.schedule ?? fallbackCourse.schedule}</p>
          <p className="text-sm text-gray-600">{courseData?.scheduleDetails ?? fallbackCourse.scheduleDetails}</p>
          <p className="text-sm text-gray-600">{courseData?.pace ?? fallbackCourse.pace}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-6">
        <Link href={`/`}><Button variant="outline" className="px-10 py-3">Back</Button></Link>
        <Link href={`/${courseId}/chapters/1`}><Button variant="outline" className="px-10 py-3">Course Details <ArrowRight /></Button></Link>
      </div>

      {/* Reviews Section */}
      <div ref={reviewSectionRef} className="mt-20">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>Top Reviews</span>
          <span className="flex items-center gap-1">
            {renderStars(5)}
          </span>
        </h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white shadow rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={review.user.imageUrl}
                    alt={review.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{review.user.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => handleLike(review.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes}</span>
                    </button>
                    <button
                      onClick={() => setActiveReview(activeReview === review.id ? null : review.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{review.comments.length}</span>
                    </button>
                  </div>

                  {review.comments.length > 0 && (
                    <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-100">
                      {review.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={comment.user.imageUrl}
                              alt={comment.user.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{comment.user.name}</p>
                              <span className="text-xs text-gray-500">
                                {formatDate(comment.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{comment.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeReview === review.id && (
                    <div className="mt-4">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Viết bình luận của bạn..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleComment(review.id)}
                          className="self-end"
                          size="icon"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;