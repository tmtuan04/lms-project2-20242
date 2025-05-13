"use client";

import HustLogo from "@/app/components/HustLogo";
// import Search from "@/app/components/Search";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/app/stores/useUserStore";

export default function Header() {
    const router = useRouter();

    const { userId } = useAuth(); // Lấy thông tin user từ Clerk

    const user = useUserStore((s) => s.user)
    const fetchUser = useUserStore((s) => s.fetchUser);

    useEffect(() => {
        if (userId) {
            fetchUser(userId)
        }
    }, [userId, fetchUser])

    return (
        <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
            <div className="flex w-[50rem] items-center">
                <HustLogo />
                {/* <div className="ml-32">
                    <Search placeholder="Search courses here" />
                </div> */}
            </div>
            <div className="flex items-center gap-4">
                {user?.isInstructor && (
                    <Button
                        onClick={() => router.push('/instructor')}
                        variant="outline"
                        className="hidden md:block"
                    >
                        Instructor Dashboard
                    </Button>
                )}

                {/* Clerk Avatar */}
                <div className="w-8 h-8 relative">
                    <Image
                        src={user?.imageUrl || "/avatar.png"}
                        alt="User Avatar"
                        fill
                        className="object-cover rounded-full"
                    />
                </div>
            </div>
        </header>
    );
}
