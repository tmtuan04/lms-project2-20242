"use client";

import Link from "next/link";
import { Menu, Compass } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <nav>
        <ul className="font-medium">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded"
            >
              <Menu className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/browse"
              className="flex items-center p-3 text-[#255C6E] bg-[#F2FBFF] rounded"
            >
              <Compass className="mr-2 text-[#255C6E]" />
              Browse
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
