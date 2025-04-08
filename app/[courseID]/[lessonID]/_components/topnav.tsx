
import HustLogo from '@/app/components/HustLogo';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
export default function TopNav() {

    return (
        <header className="w-full p-4 flex justify-between items-center border-b-2 border-gray-300">
            <div>
                <HustLogo />
            </div>
            <div className='flex justify-end items-center gap-10'>
                <Link href="/">
                    <button
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-red-600 cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Exit</span>
                    </button>
                </Link>

                {/* Avatar rỗng */}
                <button className="p-2 rounded-full bg-gray-200">
                    <User className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
