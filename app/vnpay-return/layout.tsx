import React, { Suspense } from "react";

export default function VNPayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4">
        <Suspense fallback={<div className="py-20 text-center">Đang tải trang kết quả...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
