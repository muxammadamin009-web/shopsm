import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import "./bot/bot.js";

import categoryRoutes from "./router/categoryRoutes.js";
import orderRoutes from "./router/orderRoutes.js";

dotenv.config();

app.use("/api/categories", categoryRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
};

start();