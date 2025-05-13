'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function VNPayReturnPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const query = searchParams.toString();
        const res = await fetch(`/api/vnpay-return?${query}`);
        const data = await res.json();
        
        setMessage(data.message);
        setStatus(data.success ? "success" : "error");
        
        // Optional: Redirect to course page after successful payment
        if (data.success && data.courseId) {
          setTimeout(() => {
            router.push(`/${data.courseId}`);
          }, 2000);
        }
      } catch (error) {
        const err = error as Error;
        console.log(err.message);
        setStatus("error");
        setMessage("Có lỗi xảy ra trong quá trình xác minh thanh toán");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchParams) {
      verifyPayment();
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Kết quả thanh toán</h1>
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
          <p className="text-lg text-gray-500">Đang xác minh thanh toán...</p>
        </div>
      ) : (
        <p
          className={`text-lg ${
            status === "pending"
              ? "text-gray-500"
              : status === "success"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}