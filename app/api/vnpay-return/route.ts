import { NextRequest, NextResponse } from "next/server";
import { vnpay, ReturnQueryFromVNPay } from "@/app/lib/vnpay";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const vnp_OrderInfo = url.searchParams.get("vnp_OrderInfo") || "";
    const match = vnp_OrderInfo.match(/course-(.+?)-order/);
    const courseId = match ? match[1] : null;

    const queryParams = Object.fromEntries(url.searchParams.entries());

    const verify = vnpay.verifyReturnUrl(queryParams as ReturnQueryFromVNPay);

    if (!verify.isVerified) {
      return NextResponse.json(
        { success: false, message: "Xác thực tính toàn vẹn dữ liệu thất bại" },
        { status: 400 }
      );
    }

    if (!verify.isSuccess) {
      return NextResponse.json(
        { success: false, message: "Đơn hàng thanh toán thất bại" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanh toán thành công!",
      courseId,
    });
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    return NextResponse.json(
      { success: false, message: "Dữ liệu không hợp lệ" },
      { status: 400 }
    );
  }
}
