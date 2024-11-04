const axios = require("axios");

async function getRandomGif() {
  try {
    const response = await axios.get("https://api.giphy.com/v1/gifs/random", {
      params: {
        api_key: "vcZIuNV9g0oggbvmsLmzW9ujRCNWMDEf", // Замените на ваш API-ключ Giphy
        tag: "funny",
        rating: "pg",
      },
    });

    const gifUrl = response.data.data.images.original.url; // URL случайного GIF
    return gifUrl;
  } catch (error) {
    console.error("Ошибка при получении GIF:", error);
    return null;
  }
}

module.exports = { getRandomGif };
