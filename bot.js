require("dotenv").config();
const { Bot, Keyboard } = require("grammy");
const { getRandomGif } = require("./controlers/getRandomGift");
const { getJoke } = require("./controlers/getJoke");

// Инициализация бота
const bot = new Bot(process.env.BOT_API); // Замените "YOUR_BOT_TOKEN" на токен вашего бота
const keyboard = new Keyboard()
  .text("Анекдот")
  .row()
  .text("Играть")
  .row()
  .resized()
  .persistent();

// Команда /start
bot.command("start", (ctx) => {
  ctx.reply("Бот работает, а ты нет...", { reply_markup: keyboard });
});

// Обработчик команды "Анекдот"
bot.hears("Анекдот", async (ctx) => {
  const joke = await getJoke();
  const gifUrl = await getRandomGif();

  try {
    const message =
      `😂 <b>Анекдот для ${ctx.from.first_name}</b> 😂\n\n` +
      `<i>${joke}</i>\n\n` +
      `💬 Чтобы получить еще один анекдот, нажми на кнопку!`;

    if (gifUrl) {
      await ctx.replyWithAnimation(gifUrl, {
        caption: message,
        parse_mode: "HTML",
      });
    } else {
      await ctx.reply(message, { parse_mode: "HTML" });
    }
  } catch (error) {
    console.log(error);
  }
});

bot.hears("Играть", (ctx) => {
  ctx.reply(
    `Перейдите в бота чтобы играть @AnektodisPodlivoyBot\n\nПропишите команду /game`
  );
});

bot.command("game", async (ctx) => {
  try {
    await ctx.reply("Нажми на кнопку ниже, чтобы запустить игру!", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Запустить игру 🎮",
              web_app: { url: process.env.MINI_APP_URL },
            },
          ],
        ],
      },
    });
  } catch {
    await ctx.reply("Ошибка запуска игры!");
  }
});

// Запуск бота
bot.start();
console.log("Бот запущен. Ожидает команд...");
