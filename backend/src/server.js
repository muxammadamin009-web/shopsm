import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SHOPSM Backend is running",
  });
});

const start = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
};

start();