'use client';

import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useUserStore } from '@/app/stores/useUserStore';

export function EnrollButton({ price, courseId }: { price: number, courseId: string }) {
    const user = useUserStore((s) => s.user);

    const handleEnroll = async () => {
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
            alert("Thanh toán thất bại: " + data.message);
        }
    };

    return (
        <Button onClick={handleEnroll} variant="outline">
            <CreditCard />
            Enroll: {formatPrice(price)}
        </Button>
    );
}
