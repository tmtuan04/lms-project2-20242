'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, ThumbsUp, MessageCircle, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea";

const CourseDetailsPage = () => {
  const courseData = {
    title: 'Introduction to JavaScript',
    description: 'Start your web development journey by learning JavaScript — the core programming language of the web. This course introduces the fundamentals of JavaScript, helping you build interactive websites and understand how the browser executes code!',
    instructor: {
      name: 'Tu Minh Tuan',
      avatar: '/avatar.png',
    },
    enrolled: '1,234,567',
    chapters: '17',
    rating: '5.0',
    reviews: '232.000',
    level: 'Beginner level',
    levelDescription: 'No prior experience required',
    schedule: 'Flexible schedule',
    scheduleDetails: '2 months, 10 hours a week',
    pace: 'Learn at your own pace',
    logo: 'https://www.svgrepo.com/show/303206/javascript-logo.svg',
    createdAt: '2024-01-15T08:00:00',
  };
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: {
        name: 'Nguyen Van A',
        avatar: '/avatar.png',
      },
      rating: 5,
      comment: 'Rất dễ hiểu và phù hợp cho người mới!',
      timestamp: '2024-03-15T10:30:00',
      likes: 12,
      comments: [
        {
          id: 1,
          user: {
            name: 'Tran Van C',
            avatar: '/avatar.png',
          },
          comment: 'Đồng ý với bạn!',
          timestamp: '2024-03-15T11:00:00'
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Tran Thi B',
        avatar: '/avatar.png',
      },
      rating: 4,
      comment: 'Khóa học cực kỳ chất lượng và chi tiết.',
      timestamp: '2024-03-14T15:45:00',
      likes: 8,
      comments: []
    }
  ]);

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
              avatar: '/avatar.png',
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
    return new Date(dateString).toLocaleDateString('vi-VN', {
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

  return (
    <div className="bg-[#f7f9fc] py-12 px-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center mb-6">
        <Image
          src={courseData.logo}
          alt="Course Logo"
          width={150}
          height={150}
          className="rounded-2xl mb-4 md:mb-0 md:mr-8"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
            <Image
              src={courseData.instructor.avatar}
              alt="Instructor"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <span className="text-sm font-semibold text-gray-800">
                Instructor:{' '}
                <a href="#" className="underline">
                  {courseData.instructor.name}
                </a>
              </span>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Created: {formatCourseDate(courseData.createdAt)}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-800 font-semibold">
            {courseData.enrolled} already enrolled
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-800 mb-6"><span className='font-bold'>Description</span>: {courseData.description}</p>

      {/* Info Box */}
      <div className="bg-white rounded-2xl shadow-md px-8 py-6 flex flex-col md:flex-row justify-between items-center text-center mb-10">
        <div className="mb-4 md:mb-0">
          <p className="font-semibold underline">{courseData.chapters} chapters</p>
        </div>
        <div className="mb-5 md:mb-0">
          <p className="font-bold text-lg">{courseData.rating} ⭐</p>
          <p className="text-sm text-gray-600">({courseData.reviews} reviews)</p>
        </div>
        <div className="mb-4 md:mb-1">
          <p className="font-bold md:mb-1">{courseData.level}</p>
          <p className="text-sm text-gray-600">{courseData.levelDescription}</p>
        </div>
        <div className="mb-4 md:mb-1">
          <p className="font-bold md:mb-1">{courseData.schedule}</p>
          <p className="text-sm text-gray-600">{courseData.scheduleDetails}</p>
          <p className="text-sm text-gray-600">{courseData.pace}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-6">
        <Button variant="outline" className="px-10 py-3">Back</Button>
        <Button variant="outline" className="px-10 py-3">Course Details <ArrowRight /></Button>
      </div>

      {/* Reviews Section */}
      <div ref={reviewSectionRef} className="mt-20">
        <h2 className="text-2xl font-bold mb-4">Top Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white shadow rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={review.user.avatar}
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
                              src={comment.user.avatar}
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