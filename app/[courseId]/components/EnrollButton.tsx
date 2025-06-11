'use client';

import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useUserStore } from '@/app/stores/useUserStore';
import toast from 'react-hot-toast';

export function EnrollButton({ price, courseId }: { price: number, courseId: string }) {
    const user = useUserStore((s) => s.user);

    const handleEnroll = async () => {
        if (!user) {
            toast.error("Bạn cần đăng nhập trước khi đăng ký khoá học!");
            return;
        }
        // Nếu miễn phí, gọi API để ghi danh luôn mà không qua thanh toán
        if (price === 0) {
            const res = await fetch("/api/enrollments", {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    courseId,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Đăng ký khóa học thành công!");
                window.location.href = `/${courseId}/chapters/1`;
            } else {
                toast.error("Đăng ký thất bại: " + data.message);
            }

            return;
        }

        const res = await fetch("/api/order", {
            method: "POST",
            body: JSON.stringify({
                userId: user?.id,
                courseId: courseId,
                amount: price,
                customerName: user?.name,
                customerEmail: user?.email,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (data.success) {
            window.location.href = data.paymentUrl;
        } else {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!")
        }
    };

    return (
        <Button onClick={handleEnroll} variant="outline">
            <CreditCard />
            Enroll: {formatPrice(price)}
        </Button>
    );
}