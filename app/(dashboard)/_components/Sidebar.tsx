"use client";

import Link from "next/link";
import clsx from "clsx";
import { Menu, Compass } from "lucide-react";
import { usePathname } from "next/navigation";

// Ở đây phải dùng clsx, chuyển sang map link thế này

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Menu,
  },
  {
    name: "Browse",
    href: "/dashboard/browse",
    icon: Compass,
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
            // console.log("pathname is", pathname)
            // console.log("link.href is", link.href)
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
          {/* <li>
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
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}
