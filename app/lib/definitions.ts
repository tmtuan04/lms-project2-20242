export interface CourseCardProps {
    id: string
    instructor: string
    title: string
    category: string
    chaptersCount: number
    price: number
    imageUrl: string
}

export interface LessonProps {
    id: string
    title: string
    isLocked: boolean
    videoUrl: string
    content: string
    order: number
    courseName: string
    courseId: string
}

export interface Lesson {
  id: string;
  title: string;
  courseId: string;
  videoUrl: string;
  courseName: string;
  isLocked: boolean;
  description?: string;
}

export interface CourseWithLessons {
  id: string;
  title: string;
  description: string;
  price: number;
  chaptersCount: number;
  imageUrl: string;
  instructor: string;
  chapters: {
    id: string;
    title: string;
    videoUrl: string;
    isLocked: boolean;
    description?: string;
    attachments: {
      id: string;
      name: string;
      url: string;
    }[];
  }[];
}