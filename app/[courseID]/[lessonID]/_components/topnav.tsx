"use client";

import HustLogo from '@/app/components/HustLogo';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function TopNav() {

    const { user } = useUser();

    return (
        <header className="w-full p-4 flex justify-between items-center border-b-2 border-gray-300">
            <div>
                <HustLogo />
            </div>
            <div className='flex justify-end items-center gap-10'>
                <Link href="/">
                    <button
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-red-600 cursor-pointer px-3 py-1 rounded-sm bg-gray-200"
                    >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition" />
                        <span>Exit</span>
                    </button>
                </Link>

                {/* Avatar rỗng */}
                <div className="w-10 h-10 relative">
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
