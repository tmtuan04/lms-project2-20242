'use client';

import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function EnrollButton({ price }: { price: number }) {
    console.log(price);
    const handleEnroll = async () => {
        const res = await fetch("/api/order", {
            method: "POST",
            body: JSON.stringify({
                amount: price,
                customerName: "Test Name",
                customerEmail: "test@example.com",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log(data);

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
