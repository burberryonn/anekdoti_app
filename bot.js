const { Bot, Keyboard } = require("grammy");
const { getRandomGif } = require("./controlers/getRandomGift");
const { getJoke } = require("./controlers/getJoke");

// Инициализация бота
const bot = new Bot("7389532998:AAGby3TxdbBs1saGQ9kLJd_bwaFzTyOv0Us"); // Замените "YOUR_BOT_TOKEN" на токен вашего бота
const keyboard = new Keyboard().text("Анекдот").row().resized().persistent();

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



// Запуск бота
bot.start();
console.log("Бот запущен. Ожидает команд...");
