"use client";

import Link from "next/link";

const categories = [
  { name: "Computer Science", icon: "💻", href: "/categories/computer-science" },
  { name: "Engineering", icon: "⚙️", href: "/categories/engineering" },
  { name: "Accounting", icon: "📊", href: "/categories/accounting" },
  { name: "Photography", icon: "📸", href: "/categories/photography" },
];

export default function CategoryTabs() {
  return (
    <div className="flex gap-4 p-3 border-gray-200 bg-white">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="flex bg-gray-100 rounded-full items-center px-4 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </Link>
      ))}
    </div>
  );
}
