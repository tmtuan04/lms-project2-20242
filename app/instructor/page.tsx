import { Suspense } from "react"
import CourseTable from "./coursesTable"
import Header from "./_components/Header"
import Sidebar from "./_components/SideBar"

export default function DemoPage() {
    return (
        <>
            <div className="flex flex-col">
                {/* Header */}
                <Header />

                {/* Main Layout */}
                <div className="flex flex-1 min-h-screen">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col">
                        <Suspense fallback={<div>Loading...</div>}>
                            <CourseTable />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}
