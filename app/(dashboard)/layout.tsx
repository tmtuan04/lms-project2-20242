import SideNav from '@/app/(dashboard)/_components/Sidebar';
// import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow  md:overflow-y-auto scrollbar-none  ">
                    {children}
                </div>
            </div>
        </>
    );
}