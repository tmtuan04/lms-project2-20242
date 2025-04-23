import { Metadata } from "next";
import Header from "./_components/Header";
import Sidebar from "./_components/SideBar";

export const metadata: Metadata = {
    title: "Instructor Dashboard",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Layout */}
            <div className="flex flex-1 min-h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
}