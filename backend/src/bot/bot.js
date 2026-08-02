import { Telegraf } from "telegraf";
import registerCommands from "./commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

const isAdmin = (ctx) =>
  ctx.from.id === Number(process.env.ADMIN_CHAT_ID);

bot.start(async (ctx) => {

  if (isAdmin(ctx)) {

    return ctx.reply(
      "GOOD DAY! WHAT WOULD YOU LIKE TO DO?",
      {
        reply_markup: {
          keyboard: [
            ["📊 Dashboard", "📦 Orders"],
            ["🛍 Products", "📂 Categories"],
            ["👥 Users"]
          ],
          resize_keyboard: true,
        },
      }
    );

  }

  return ctx.reply(
    "🏪 Welcome to ShopSM!",
    {
      reply_markup: {
        keyboard: [
          ["🛍 Catalog", "🛒 Cart"],
          ["📦 My Orders", "👤 Profile"],
          ["☎ Support"]
        ],
        resize_keyboard: true,
      },
    }
  );

});

registerCommands(bot);

bot.launch();

console.log("Bot successfully started");

export default bot;