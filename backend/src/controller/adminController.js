import User from "../models/userModel.js";
import Product from "../models/productModels.js";
import Category from "../models/categoryModels.js";
import Order from "../models/orderModel.js";

const getStats = async (req, res) => {
  try {
    const [users, products, categories, orders, revenueResult] =
      await Promise.all([
        User.countDocuments({}),
        Product.countDocuments({}),
        Category.countDocuments({}),
        Order.countDocuments({}),

        Order.aggregate([
          {
            $group: {
              _id: null,
              total: {
                $sum: "$totalPrice",
              },
            },
          },
        ]),
      ]);

    const revenue =
      revenueResult.length > 0
        ? revenueResult[0].total
        : 0;

    res.json({
      users,
      products,
      categories,
      orders,
      revenue,
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    res.status(500).json({
      message: "Failed to get admin statistics",
    });
  }
};

export default {
  getStats,
};