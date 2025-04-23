"use client"

import HustLogo from "@/app/components/HustLogo";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";

//}

export default function Header() {
    const { user } = useUser(); // Lấy thông tin user từ Clerk
    console.log(user)

    return (
        <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
            <div className="flex w-[50rem] items-center">
                <HustLogo />
            </div>

            {/* Clerk Avatar */}
            <div className='flex justify-end items-center gap-8 pr-2'>
                {/* Exit */}
                <Link href="/dashboard">
                    <button
                        className="group flex items-center gap-2 font-semibold text-gray-900 hover:text-red-600 cursor-pointer px-3 py-1 rounded-sm bg-gray-200"
                    >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition" />
                        <span>Exit</span>
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