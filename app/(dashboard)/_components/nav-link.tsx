'use client';
import { LayoutGrid, Globe } from 'lucide-react';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { name: 'Browse', href: '/router', icon: Globe },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            { 'bg-sky-100 text-blue-600 border-2 border-sky-600': pathname === link.href, },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}