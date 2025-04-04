export interface CourseCardProps {
    id: string
    title: string
    category: string
    chapter: number
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
    // courseId?: string
}