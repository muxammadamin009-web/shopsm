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


app.use(bot.webhookCallback("/telegram"));

const start = async () => {
  try {

    await connectDB();

    await bot.telegram.setWebhook(
      `${process.env.RENDER_EXTERNAL_URL}/telegram`
    );

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (error) {

    console.error(error);

  }
};

start();