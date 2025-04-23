"use client";

import Link from "next/link";
import { Menu, ChartNoAxesCombined } from "lucide-react";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    {
        name: "Courses",
        href: "/instructor",
        icon: Menu,
    },
    {
        name: "Analytics",
        href: "/instructor/analytics",
        icon: ChartNoAxesCombined,
    },
];

export default function Sidebar() {

    const pathname = usePathname();


    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen">
            <nav>
                <ul className="font-medium">
                    {links.map((link) => {
                        const isActive = pathname === link.href
                        const Icon = link.icon

                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={clsx(
                                        "flex items-center p-4 rounded",
                                        {
                                            "text-[#255C6E] bg-[#F2FBFF]": isActive,
                                            "text-gray-700 hover:bg-gray-100": !isActive,
                                        }
                                    )}
                                >
                                    <Icon
                                        className={clsx(
                                            "mr-2",
                                            {
                                                "text-[#255C6E]": isActive,
                                            }
                                        )}
                                        size={20}
                                    />
                                    {link.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    );
}
