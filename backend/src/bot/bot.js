import { Telegraf } from "telegraf";
import registerCommands from "./commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {

  ctx.reply(`
🛍 SHOPSM Bot

Commands:

/stats
`);

});

registerCommands(bot);

bot.launch();

console.log("Bot successfully started");

export default bot;