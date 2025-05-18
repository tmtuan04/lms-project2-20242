"use client"

import CourseTable from "./_components/coursesTable"
import { CourseTableData } from "@/app/lib/definitions"
import { getCoursesByInstructor } from "@/app/lib/data"
import { useUserStore } from "@/app/stores/useUserStore"
import { useEffect, useState } from "react"

export default function TableCoursePage() {
    const [courses, setCourses] = useState<CourseTableData[]>([])

    // Zustand oke
    const user = useUserStore((state) => state.user)

    useEffect(() => {
        const fetchCourses = async () => {
            if (user?.id) {
                const data = await getCoursesByInstructor(user.id);
                setCourses(data)
            }
        }
        fetchCourses()
    }, [user?.id])

    return (
        <CourseTable fetchData={courses} />
    )
}
