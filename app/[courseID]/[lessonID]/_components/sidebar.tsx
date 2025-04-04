'use client';
import { Lock, PlayCircle } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LessonProps } from '@/app/lib/definitions';

export default function SidebarMenu({ lessons }: { lessons: LessonProps[] }) {
    const pathname = usePathname();

    return (
        <div className="w-70">
            <p className="text-xl font-extrabold  px-4 py-6 ">
                {lessons[0].courseName}
            </p>
            {lessons.map((lesson) => (
                <Link
                    key={lesson.id}
                    // href={lesson.locked ? '#' : lesson.href}
                    href={`/${lesson.courseId}/${lesson.id}`}
                    className={clsx(
                        'flex grow  items-center gap-3 p-4  text-sm font-medium hover:bg-sky-200 hover:text-blue-600',
                        // lesson.locked
                        //     ? 'text-gray-400 cursor-not-allowed'
                        //     : 'hover:bg-sky-200 hover:text-blue-600',
                        {
                            'bg-gray-100 text-black border-r-4 border-r-gray-600 border-2 border-gray-300'
                                : pathname === `/${lesson.courseId}/${lesson.id}`
                        }
                    )}
                >
                    {lesson.isLocked ? (
                        <Lock className="w-5 h-5" />
                    ) : (
                        <PlayCircle className="w-5 h-5" />
                    )}
                    <span>{lesson.title}</span>
                </Link>

            ))}


        </div>
    );
}
