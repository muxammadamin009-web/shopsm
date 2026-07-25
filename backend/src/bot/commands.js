import User from "../models/userModel.js";
import Product from "../models/productModels.js";
import Order from "../models/orderModel.js";

export default function registerCommands(bot) {

  bot.command("stats", async (ctx) => {

    try {

      const users = await User.countDocuments();
      const products = await Product.countDocuments();
      const orders = await Order.countDocuments();

      const revenue = await Order.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalPrice",
            },
          },
        },
      ]);

      const totalRevenue =
        revenue.length ? revenue[0].total : 0;

      await ctx.reply(`
📊 SHOPSM

👥 Users: ${users}
🛍 Products: ${products}
📦 Orders: ${orders}
💰 Revenue: $${totalRevenue}
`);

    } catch (err) {

      console.log(err);

    }

  });

  bot.command("orders", async (ctx) => {

    try {

      const orders = await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(10);

      if (!orders.length) {
        return ctx.reply("No orders.");
      }

      for (const order of orders) {

        await ctx.reply(

`🛒 <b>ORDER</b>

👤 ${order.user?.name}

📧 ${order.user?.email}

💰 $${order.totalPrice}

📌 <b>${order.status.toUpperCase()}</b>`,

          {
            parse_mode: "HTML",

            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text:
                      order.status === "pending"
                        ? "✅ 🟡 Pending"
                        : "🟡 Pending",
                    callback_data: `status:${order._id}:pending`,
                  },
                  {
                    text:
                      order.status === "processing"
                        ? "✅ 🔵 Processing"
                        : "🔵 Processing",
                    callback_data: `status:${order._id}:processing`,
                  },
                ],
                [
                  {
                    text:
                      order.status === "delivered"
                        ? "✅ 🚚 Delivered"
                        : "🚚 Delivered",
                    callback_data: `status:${order._id}:delivered`,
                  },
                  {
                    text:
                      order.status === "cancelled"
                        ? "✅ ❌ Cancelled"
                        : "❌ Cancelled",
                    callback_data: `status:${order._id}:cancelled`,
                  },
                ],
              ],
            },
          }

        );

      }

    } catch (err) {

      console.log(err);

    }

  });

  bot.action(/status:(.*):(.*)/, async (ctx) => {

    try {

      const [, orderId, status] = ctx.match;

      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          status,
        },
        {
          new: true,
        }
      ).populate("user", "name email");

      await ctx.editMessageText(

`🛒 <b>ORDER</b>

👤 ${order.user?.name}

📧 ${order.user?.email}

💰 $${order.totalPrice}

📌 <b>${order.status.toUpperCase()}</b>`,

        {
          parse_mode: "HTML",

          reply_markup: {
            inline_keyboard: [
              [
                {
                  text:
                    order.status === "pending"
                      ? "✅ 🟡 Pending"
                      : "🟡 Pending",
                  callback_data: `status:${order._id}:pending`,
                },
                {
                  text:
                    order.status === "processing"
                      ? "✅ 🔵 Processing"
                      : "🔵 Processing",
                  callback_data: `status:${order._id}:processing`,
                },
              ],
              [
                {
                  text:
                    order.status === "delivered"
                      ? "✅ 🚚 Delivered"
                      : "🚚 Delivered",
                  callback_data: `status:${order._id}:delivered`,
                },
                {
                  text:
                    order.status === "cancelled"
                      ? "✅ ❌ Cancelled"
                      : "❌ Cancelled",
                  callback_data: `status:${order._id}:cancelled`,
                },
              ],
            ],
          },
        }

      );

      await ctx.answerCbQuery("✅ Status updated");

    } catch (err) {

      console.log(err);

      await ctx.answerCbQuery("❌ Error");

    }

  });

}