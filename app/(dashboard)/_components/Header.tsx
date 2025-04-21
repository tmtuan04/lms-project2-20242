"use client";

import HustLogo from "@/app/components/HustLogo";
import Search from "@/app/components/Search";
import Image from "next/image";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkIsInstructor } from "@/app/lib/data";
import { Button } from "@/components/ui/button";

export default function Header() {
    const { user, isLoaded } = useUser(); // Lấy thông tin user từ Clerk
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const [isInstructor, setIsInstructor] = useState(true);

    // useEffect(() => {
    //     async function checkInstructorStatus() {

    //         if (isLoaded && isSignedIn && user?.id) {
    //             const status = await checkIsInstructor(user.id);
    //             setIsInstructor(status);
    //         }
    //     }

    //     checkInstructorStatus();
    // }, [isLoaded, isSignedIn, user?.id, user]);

    return (
        <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
            <div className="flex w-[50rem] items-center">
                <HustLogo />
                <div className="ml-32">
                    <Search placeholder="Search courses here" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                {isInstructor && (
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
