import { NextRequest, NextResponse } from "next/server";
import { vnpay, ReturnQueryFromVNPay } from "@/app/lib/vnpay";
import { findOrderById, updateOrderStatus } from "@/services/order-service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Xử lý bên phía backend

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const verify = vnpay.verifyReturnUrl(queryParams as ReturnQueryFromVNPay);

    if (!verify.isVerified) {
      return NextResponse.json({ RspCode: "97", Message: "Invalid signature" });
    }

    const orderId = queryParams["vnp_TxnRef"];
    const payment = await findOrderById(orderId);

    if (!payment) {
      return NextResponse.json({ RspCode: "01", Message: "Order not found" });
    }

    if (payment.status === "SUCCESS") {
      return NextResponse.json({
        RspCode: "02",
        Message: "Order already processed",
      });
    }

    if (verify.isSuccess) {
      await updateOrderStatus(
        orderId,
        "SUCCESS",
        queryParams["vnp_TransactionNo"]
      );
      // ✅ Ghi danh người dùng vào khóa học
      const alreadyEnrolled = await prisma.courseEnrollment.findFirst({
        where: {
          userId: payment.userId,
          courseId: payment.courseId,
        },
      });

      if (!alreadyEnrolled) {
        await prisma.courseEnrollment.create({
          data: {
            userId: payment.userId,
            courseId: payment.courseId,
          },
        });
      }
    } else {
      await updateOrderStatus(
        orderId,
        "FAILED",
        queryParams["vnp_TransactionNo"]
      );
    }
  } catch (error) {
    const err = error as Error;
    console.error("VNPay IPN error:", err.message);
    return NextResponse.json({ RspCode: "99", Message: "Unknown error" });
  }
}
