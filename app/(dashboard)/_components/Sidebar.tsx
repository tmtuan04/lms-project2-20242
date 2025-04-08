"use client";

import Link from "next/link";
import { Menu, Compass } from "lucide-react";

// Ở đây phải dùng clsx, chuyển sang map link thế này

// const links = [
//   { name: 'Home', href: '/dashboard', icon: HomeIcon },
//   {
//     name: 'Invoices',
//     href: '/dashboard/invoices',
//     icon: DocumentDuplicateIcon,
//   },
//   { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
// ];

export default function Sidebar() {

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <nav>
        <ul className="font-normat">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-4 text-gray-700 hover:bg-gray-100 rounded"
            >
              <Menu className="mr-2" size={20}/>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/browse"
              className="flex items-center p-4 text-[#255C6E] bg-[#F2FBFF] rounded"
            >
              <Compass className="mr-2 text-[#255C6E]" size={20}/>
              Browse
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
