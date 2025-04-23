"use client";

import Link from "next/link";
import { Menu, ChartNoAxesCombined } from "lucide-react";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Sidebar() {

    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 ">
            <nav>
                <ul className="font-normat">
                    <li>
                        <Link
                            href="/instructor"
                            className={clsx(
                                'flex items-center p-4 text-gray-700 hover:bg-gray-100 ',
                                { 'bg-sky-200 text-blue-600 border-r-[3px] border-sky-600': pathname === "/instructor", },
                            )}
                        >
                            <Menu className="mr-2" size={20} />
                            Courses
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/instructor/analytics"
                            className={clsx(
                                'flex items-center p-4 text-gray-700 hover:bg-gray-100 ',
                                { 'bg-sky-200 text-blue-600 border-r-[3px] border-sky-600': pathname === "/instructor/analytics", },
                            )}
                        >
                            <ChartNoAxesCombined className="mr-2" size={20} />
                            Analytics
                        </Link>

                    </li>
                </ul>
            </nav>
        </aside>
    );
}
