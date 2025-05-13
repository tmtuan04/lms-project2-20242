import { Metadata } from "next";
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function Layout({ children }: { children: React.ReactNode }) {
    // const { userId } = useAuth();
    // const fetchUser = useUserStore((s) => s.fetchUser)

    // useEffect(() => {
    //     if (userId) {
    //         fetchUser(userId)
    //     }
    // }, [userId, fetchUser])

    return (
        <div className="flex flex-col h-screen">
            <Header />
            {/* Main Layout */}
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 flex flex-col">{children}</div>
            </div>
        </div>
    );
}