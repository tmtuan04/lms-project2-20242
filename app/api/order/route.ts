import { NextResponse } from "next/server";
import { vnpay, ProductCode, VnpLocale } from "@/app/lib/vnpay";
import { createOrder } from "@/services/test-service";

// console.log("order");
// export {};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Bổ sung hàm này
    const rawOrder = await createOrder(body);
    const order = {
      order_id: String(rawOrder[0]),
      amount: Number(rawOrder[1]),
    };

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor || "127.0.0.1";

    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: order.amount,
      vnp_IpAddr: ip,
      vnp_TxnRef: order.order_id,
      vnp_OrderInfo: `Thanh toan don hang ${order.order_id}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: "http://localhost:5173/vnpay-return", // Thay lại bằng link khác, test thì cứ để như này 
      vnp_Locale: VnpLocale.VN,
    });

    return NextResponse.json({
      success: true,
      paymentUrl,
      order,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi tạo đơn hàng",
        error: err.message,
      },
      { status: 500 }
    );
  }
}