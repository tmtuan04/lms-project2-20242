
import LessonContent from './_components/LessonContent';
import { lessons } from './layout';

async function Page({ params }: { params: Promise<{ lessonID: string }> }) {

    // const isLocked = true; 
    const lessonId = (await params).lessonID.toString();

    // const lessonId = Array.isArray(lessonIdArray) ? lessonIdArray.at(-1) : lessonIdArray;
    const lesson = lessons.find((l) => l.id === lessonId);

    // console.log("parrams", params.lessonID);
    // console.log("lessonId", typeof lessonId);
    // console.log("Type of params:", typeof params.lessonID);
    // console.log("Found lesson:", lessons);

    if (!lesson) {
        return <div className='h-lvh'></div>;
    }


    return (
        <>
            {/* Nội dung các chương */}
            <LessonContent lesson={lesson} />
        </>
    );
}

export default Page;