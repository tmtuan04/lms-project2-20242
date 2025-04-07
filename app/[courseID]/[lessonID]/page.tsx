
import LessonContent from './_components/LessonContent';
import { LessonProps } from '@/app/lib/definitions';
import SidebarMenu from "./_components/sidebar";
import TopNav from "./_components/topnav";

export const lessons: LessonProps[] = [
    {
        id: "lesson-1",
        title: "Introduction to IoT",
        content: "This lesson covers the basics of IoT and its applications.",
        order: 1,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: false,
        courseName: "IoT Fundamentals",
        courseId: "048999d2-b571-4087-8dbf-4430cfe572e9",
    },
    {
        id: "lesson-2",
        title: "Setting Up Your IoT Device",
        content: "Learn how to configure and connect your IoT device to the network.",
        order: 2,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: false,
        courseName: "IoT Fundamentals",
        courseId: "048999d2-b571-4087-8dbf-4430cfe572e9",
    },
    {
        id: "lesson-3",
        title: "IoT Security Basics",
        content: "Understand the security risks in IoT and how to mitigate them.",
        order: 3,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: true,
        courseName: "IoT Fundamentals",
        courseId: "048999d2-b571-4087-8dbf-4430cfe572e9",
    },
    {
        id: "lesson-4",
        title: "Cloud Integration for IoT",
        content: "Learn how to connect your IoT device with cloud platforms.",
        order: 4,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: true,
        courseName: "IoT Fundamentals",
        courseId: "048999d2-b571-4087-8dbf-4430cfe572e9",
    },
    {
        id: "lesson-5",
        title: "IoT Data Analytics",
        content: "An introduction to data analytics techniques in IoT applications.",
        order: 5,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: true,
        courseName: "IoT Fundamentals",
        courseId: "048999d2-b571-4087-8dbf-4430cfe572e9",
    },
];


async function Page({ params }: {
    params: { lessonID: string };
}) {

    const lessonId = (await params).lessonID;

    // const lessonId = Array.isArray(lessonIdArray) ? lessonIdArray.at(-1) : lessonIdArray;
    const lesson = lessons.find((l) => l.id === lessonId);

    // console.log("parrams", params.lessonID);
    // console.log("lessonId", typeof lessonId);
    // console.log("Type of params:", typeof params.lessonID);
    // console.log("Found lesson:", lessons);

    if (!lesson) {
        return <div className='h-lvh'>Error</div>;
    }


    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-col  border-r-2 border-gray-300">
                    <SidebarMenu lessons={lessons} />
                    <div className="h-auto w-full grow "></div>
                </div>

                {/* Top Nav */}
                <div className="flex flex-col grow ">
                    <TopNav />
                    {/* Nội dung các chương */}
                    <div className="flex-grow  scrollbar-none  ">
                        <LessonContent lesson={lesson} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Page;