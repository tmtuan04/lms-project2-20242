import Header from '@/app/(dashboard)/_components/Header';
import React from 'react';

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#f7f9fc] flex justify-center items-center p-4">
                <div className="max-w-5xl w-full">
                    {children}
                </div>
            </div>
        </>
    );
};

export default CourseLayout;