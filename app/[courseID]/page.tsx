import { redirect } from 'next/navigation';

export default async function CoursePage({
    params,
}: {
    params: { courseID: string };
}) {
    const course = await params.courseID.toString();

    // Redirect đến lesson đầu tiên nếu tồn tại
    if (course) {
        redirect(`/${course}/lesson-1`);
    }

    return (
        <div>Khóa học này chưa có bài học nào!</div>
    );
}