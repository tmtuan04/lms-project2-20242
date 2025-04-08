"use client"

import HustLogo from "@/app/components/HustLogo";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function Header() {
    const { user } = useUser(); // Lấy thông tin user từ Clerk
    console.log(user)

    return (
        <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
            <div className="flex w-[50rem] items-center">
                <HustLogo />
                <div className="flex-grow">
                    <SearchBar />
                </div>
            </div>

            {/* Clerk Avatar */}
            <div className="w-10 h-10 relative">
                <Image
                    src={user?.imageUrl || "/avatar.png"}
                    alt="User Avatar"
                    fill
                    className="object-cover rounded-full"
                />
            </div>
        </header>
    )
}