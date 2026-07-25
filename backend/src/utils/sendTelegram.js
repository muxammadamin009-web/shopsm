import bot from "../bot/bot.js";

export const sendTelegram = async (
  message,
  keyboard = null
) => {

  try {

    await bot.telegram.sendMessage(
      process.env.ADMIN_CHAT_ID,
      message,
      {
        parse_mode: "HTML",
        reply_markup: keyboard,
      }
    );

  } catch (error) {

    console.log("Telegram Error:", error.message);

  }

};