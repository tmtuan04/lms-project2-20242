
import SidebarMenu from "./_components/sidebar";
import { LessonProps } from '@/app/lib/definitions';
import TopNav from "./_components/topnav";

// Fake data
export const lessons: LessonProps[] = [
    {
        id: "lesson-1",
        title: "Introduction to IoT",
        content: "This lesson covers the basics of IoT and its applications.",
        order: 1,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: false,
        courseName: "IoT Fundamentals",
    },
    {
        id: "lesson-2",
        title: "Setting Up Your IoT Device",
        content: "Learn how to configure and connect your IoT device to the network.",
        order: 2,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: false,
        courseName: "IoT Fundamentals",
    },
    {
        id: "lesson-3",
        title: "IoT Security Basics",
        content: "Understand the security risks in IoT and how to mitigate them.",
        order: 3,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: true,
        courseName: "IoT Fundamentals",
    },
    {
        id: "lesson-4",
        title: "Cloud Integration for IoT",
        content: "Learn how to connect your IoT device with cloud platforms.",
        order: 4,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: true,
        courseName: "IoT Fundamentals",
    },
    {
        id: "lesson-5",
        title: "IoT Data Analytics",
        content: "An introduction to data analytics techniques in IoT applications.",
        order: 5,
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        isLocked: true,
        courseName: "IoT Fundamentals",
    },
];

export default function Layout({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex flex-row">
            <div className="flex flex-col  border-r-2 border-gray-300">
                <SidebarMenu lessons={lessons} />
                <div className="h-auto w-full grow "></div>
            </div>

            {/* Thanh Top Nav */}
            <div className="flex flex-col grow ">
                <TopNav />

                {/* Nội dung các chương */}
                <div className="flex-grow  scrollbar-none  ">
                    {children}
                </div>
            </div>
        </div>
    )
}
