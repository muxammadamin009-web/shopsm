import Order from "../models/orderModel.js";
import { sendTelegram } from "../utils/sendTelegram.js";

const createOrder = async (data) => {

  const order = await Order.create(data);

  const fullOrder = await Order.findById(order._id)
    .populate("user", "name email")
    .populate("products.product");

  const products = fullOrder.products
    .map((item) => {
      const name = item.product?.name || "Unknown";
      return `• ${name} × ${item.quantity}`;
    })
    .join("\n");

  await sendTelegram(

`🛒 <b>NEW ORDER</b>

━━━━━━━━━━━━━━

👤 <b>Customer:</b>
${fullOrder.user?.name}

📧 <b>Email:</b>
${fullOrder.user?.email}

━━━━━━━━━━━━━━

📦 <b>Products:</b>

${products}

━━━━━━━━━━━━━━

💰 <b>Total:</b> $${fullOrder.totalPrice}

📌 <b>Status:</b> ${fullOrder.status}`,

{
  inline_keyboard: [
    [
      {
        text: "🟡 Pending",
        callback_data: `status:${fullOrder._id}:pending`,
      },
      {
        text: "🔵 Processing",
        callback_data: `status:${fullOrder._id}:processing`,
      },
    ],
    [
      {
        text: "🚚 Delivered",
        callback_data: `status:${fullOrder._id}:delivered`,
      },
      {
        text: "❌ Cancelled",
        callback_data: `status:${fullOrder._id}:cancelled`,
      },
    ],
  ],
}

  );

  return fullOrder;

};

const getOrders = async () => {

  return await Order.find()
    .populate("user", "name email")
    .populate("products.product")
    .sort({ createdAt: -1 });

};

const getMyOrders = async (userId) => {

  return await Order.find({
    user: userId,
  })
    .populate("products.product")
    .sort({ createdAt: -1 });

};

const updateOrderStatus = async (id, status) => {

  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate("user", "name email")
    .populate("products.product");

  return order;

};

export default {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
};