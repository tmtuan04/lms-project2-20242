"use client";

import { Search as SearchIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // Tối ưu tìm kiếm bằng cách giảm số lần gọi API.

export default function Search({ placeholder }: { placeholder: string }) {
  // Lấy các tham số từ truy vấn hiện tại từ URL
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // Thay đổi URL mà không tải lại trang
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    // Tạo bản sao của searchParams để chỉnh sửa mà không ảnh hưởng trực tiếp đến URL gốc
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Thay đổi URL mà không tải lại trang, cập nhật truy vấn tìm kiếm.
    replace(`${pathname}?${params.toString()}`);
  }, 300); // Chờ 300ms sau khi người dùng ngừng nhập mới thực thi

  return (
    <div className="relative flex">
      {/* Nhãn cho ô tìm kiếm để hỗ trợ người dùng sử dụng công cụ đọc màn hình */}
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      {/* Ô nhập liệu cho tìm kiếm */}
      <input
        className="peer block w-full sm:w-[600px] transition-all duration-300 rounded-lg border border-gray-300 py-[10px] pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
        placeholder={placeholder} // Placeholder truyền từ props, ví dụ: "Search products..."
        // Khi người dùng nhập vào ô tìm kiếm, gọi `handleSearch` với giá trị nhập vào.
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // Mặc định ô tìm kiếm sẽ hiển thị giá trị `query` hiện tại trên URL nếu có.
        defaultValue={searchParams.get("query")?.toString()}
      />

      {/* Icon kính lúp đặt bên trái input */}
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

// Thanh search 2 đẹp hơn

// 'use client';

// import { useState } from 'react';

// export default function SearchForm() {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('All categories');

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const selectCategory = (category: string) => {
//     setSelectedCategory(category);
//     setDropdownOpen(false);
//   };

//   return (
//     <form className="max-w-lg mx-auto">
//       <div className="flex">
//         <label
//           htmlFor="search-dropdown"
//           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//         >
//           Your Email
//         </label>

//         <button
//           id="dropdown-button"
//           type="button"
//           onClick={toggleDropdown}
//           className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
//         >
//           {selectedCategory}
//           <svg
//             className="w-2.5 h-2.5 ms-2.5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 10 6"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="m1 1 4 4 4-4"
//             />
//           </svg>
//         </button>

//         {dropdownOpen && (
//           <div
//             id="dropdown"
//             className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute mt-12"
//           >
//             <ul
//               className="py-2 text-sm text-gray-700 dark:text-gray-200"
//               aria-labelledby="dropdown-button"
//             >
//               {['Mockups', 'Templates', 'Design', 'Logos'].map((item) => (
//                 <li key={item}>
//                   <button
//                     type="button"
//                     onClick={() => selectCategory(item)}
//                     className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   >
//                     {item}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <div className="relative w-full">
//           <input
//             type="search"
//             id="search-dropdown"
//             placeholder="Search Mockups, Logos, Design Templates..."
//             required
//             className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//           />
//           <button
//             type="submit"
//             className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             <svg
//               className="w-4 h-4"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//               />
//             </svg>
//             <span className="sr-only">Search</span>
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }
