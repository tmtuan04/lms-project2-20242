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