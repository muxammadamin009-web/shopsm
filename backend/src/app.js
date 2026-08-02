import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./router/authRoutes.js";
import productRoutes from "./router/productRoutes.js";
import categoryRoutes from "./router/categoryRoutes.js";
import orderRoutes from "./router/orderRoutes.js";
import customerRoutes from "./router/customerRoutes.js";
import uploadRoutes from "./router/uploadRoutes.js";

const app = express();

app.use(helmet());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://shopsm.pages.dev" 
  ],
  credentials: true,
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);
app.use("/customers", customerRoutes);
app.use("/upload", uploadRoutes);

export default app;