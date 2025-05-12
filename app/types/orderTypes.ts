export interface CreateOrderInput {
  userId: string;
  courseId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
}

export interface CreateOrderResult {
  orderId: string;
  amount: number;
}