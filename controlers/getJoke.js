const axios = require("axios");
const cheerio = require("cheerio");

async function getJoke() {
  try {
    const randomPage = Math.floor(Math.random() * 1120) + 1;
    const { data } = await axios.get(`https://baneks.ru/${randomPage}`);
    const $ = cheerio.load(data);
    const joke = $("p").first().text(); // Извлекаем текст анекдота (первый параграф)
    console.log("Анекдот отправлен");
    return joke;
  } catch (error) {
    console.error("Ошибка при скрапинге:", error);
    return "Не удалось получить анекдот, попробуйте позже.";
  }
}

module.exports = { getJoke };
