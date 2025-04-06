"use client";

import Link from "next/link";
import { FaTachometerAlt, FaGlobe } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen p-3">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/browse"
              className="flex items-center p-2 text-blue-500 bg-blue-50 rounded"
            >
              <FaGlobe className="mr-2" />
              Browse
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
