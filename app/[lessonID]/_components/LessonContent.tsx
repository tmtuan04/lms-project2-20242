import { LessonProps } from "@/app/lib/definitions";
import { Lock, CircleAlert } from 'lucide-react';

function LessonContent({ lesson }: { lesson: LessonProps }) {
    return (
        <>
            {/* Nội dung các chương */}
            {lesson.isLocked && (
                <div className="bg-yellow-200 text-yellow-800 p-4 flex items-center gap-2">
                    <CircleAlert />
                    <span>You need to purchase this course to watch this chapter.</span>
                </div>
            )
            }
            <div className="p-6">
                <div className="max-w-4xl mx-auto">

                    {/* Video Player */}
                    <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                        {lesson.isLocked ? (
                            <div className="flex flex-col gap-3 items-center justify-center w-full h-full bg-gray-800 text-white">
                                <Lock className="w-10 h-10" />
                                <p className="text-lg font-semibold">
                                    This chapter is locked
                                </p>
                            </div>
                        ) : (
                            <video
                                className="w-full h-full"
                                controls
                                src="https://vjs.zencdn.net/v/oceans.mp4"
                            />
                        )}
                    </div>

                    {/* Content */}
                    <div className="mt-6 flex justify-between items-center border-b-2 border-gray-300 pb-4">
                        <p className="text-2xl font-bold">{lesson.title}</p>
                        <button className=" bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                            Enroll for ${lesson.order}
                        </button>
                    </div>
                    <div className="mt-2 text-gray-600">
                        Objectives:
                        <p>{lesson.content}</p>
                    </div>

                </div>
            </div>
        </>
    );
}

export default LessonContent;