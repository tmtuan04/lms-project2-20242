// node --no-warnings --loader ts-node/esm test-service.ts
console.log("Hello Service");

interface dataProps {
  amount: number;
  customerName: string;
  customerEmail: string;
}

// Data này truyền từ trên xuống
export const createOrder = async (data: dataProps) => {
  const { amount } = data;
  if (!amount) {
    throw new Error("Thiếu thông tin đơn hàng");
  }

  const orderId = Date.now().toString(); // ID đơn hàng tạm thời
  return [orderId, amount];
};