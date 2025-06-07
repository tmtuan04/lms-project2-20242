import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  if (price === 0) return "Free Course";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // Tổng số trang <= 5 thì hiển thị tất cả các trang mà không có dấu ...
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // Kết quả [1, 2, 3, 4, 5]
  }

  // Nếu trang hiện tại nằm trong 2 trang đầu tiên, hiển thị 2 trang đầu, dấu ba chấm và 1 trang cuối.
  if (currentPage <= 3) {
    return [1, 2, '...', totalPages];
  }

  // Nếu trang hiện tại nằm trong 2 trang cuối cùng, hiển thị 2 trang đầu, dấu ba chấm và 2 trang cuối.
  if (currentPage >= totalPages - 1) {
    return [1, 2, '...', totalPages - 1, totalPages]
  }

  // Nếu trang hiện tại nằm ở giữa, hiển thị trang đầu tiên, dấu ba chấm, trang hiện tại và trang lân cận, thêm dấu ba chấm nữa và trang cuối cùng.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}
