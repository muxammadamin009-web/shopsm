import mongoose from "mongoose";
import dotenv from "dotenv";

import Order from "./src/models/orderModel.js";
import Product from "./src/models/productModels.js";
import Category from "./src/models/categoryModels.js";

dotenv.config();

try {

  await mongoose.connect(process.env.MONGO_URL);

  await Order.deleteMany({});
  await Product.deleteMany({});
  await Category.deleteMany({});

  console.log("Orders deleted");
  console.log("Products deleted");
  console.log("Categories deleted");

} catch (err) {

  console.log(err);

} finally {

  await mongoose.disconnect();
  process.exit();

}