"use client"

import HustLogo from "@/app/components/HustLogo";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function Header() {
    const { user } = useUser(); // Lấy thông tin user từ Clerk
    // console.log("User:", user);

    return (
        <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
            <div className="flex w-[50rem] items-center">
                <HustLogo />
            </div>

            {/* Clerk Avatar */}
            <div className='flex justify-end items-center gap-3'>
                {/* Exit */}
                <Link href="/dashboard">
                    <button
                        className="group flex items-center gap-2 font-medium text-gray-900 cursor-pointer px-3 py-1 rounded-sm hover:bg-gray-200"
                    >
                        <LogOut size={14} className="group-hover:scale-110 transition" />
                        <span className="text-sm">Exit</span>
                    </button>
                </Link>

                {/* Avatar */}
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
    )
}