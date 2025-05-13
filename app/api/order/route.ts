import { NextResponse } from "next/server";
import { vnpay, ProductCode, VnpLocale } from "@/app/lib/vnpay";
import { createOrder } from "@/services/order-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { orderId, amount } = await createOrder(body);

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0].trim() || "127.0.0.1";

    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: ip,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: "https://lms-project2-20242.vercel.app/vnpay-return", // Thay lại bằng link khác, test thì cứ để như này
      vnp_Locale: VnpLocale.VN,
    });

    return NextResponse.json({
      success: true,
      paymentUrl,
      order: { orderId, amount },
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
