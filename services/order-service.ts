// node --no-warnings --loader ts-node/esm test-service.ts
import { CreateOrderInput, CreateOrderResult } from "@/app/types/orderTypes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Order
export const createOrder = async (
  data: CreateOrderInput
): Promise<CreateOrderResult> => {
  const { userId, courseId, amount, customerName, customerEmail } = data;

  if (!userId || !courseId || !amount || !customerEmail || !customerName) {
    throw new Error("Thiếu thông tin đơn hàng");
  }

  const orderId = Date.now().toString(); // Mã đơn hàng tạm thời

  await prisma.payment.create({
    data: {
      id: orderId,
      userId,
      courseId,
      amount: amount.toString(), // do model đang để String
      status: "PENDING",
      provider: "vnpay",
      // Optional: thêm currency nếu bạn sửa schema
      providerTxnId: null,
    },
  });

  return {
    orderId,
    amount,
  };
};

// Find Order by Id
export const findOrderById = async (orderId: string) => {
  return await prisma.payment.findUnique({
    where: { id: orderId },
  });
};

// updateOrderStatus
export const updateOrderStatus = async (
  orderId: string,
  status: "SUCCESS" | "FAILED" | "REFUNDED",
  providerTxnId?: string
) => {
  return await prisma.payment.update({
    where: { id: orderId },
    data: {
      status,
      providerTxnId: providerTxnId || undefined,
    },
  });
};
