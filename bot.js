  let telegrambot = require("node-telegram-bot-api") 
  const axios = require('axios'); 
  let token = "7741522611:AAGeK9nYsYab6frDz-DthcgdxN9hRPwKwBk"    
  let bot  = new telegrambot(token,{polling:true})
  let apikey =  "5fe6b511446d29983ce70a5120e83c9f"
  // Обработка команды /start
bot.onText(/\/start/, (msg) => {  // Исправлено регулярное выражение для команды
    const chatId = msg.chat.id;
    let city = "Moscow";
    getWeather(city,msg).then(() => {
        bot.sendMessage(chatId, "Привет!");  // Добавлен .then для корректной работы с async/await
    }).catch((error) => {
        bot.sendMessage(chatId, "Ошибка получения погоды");
        console.error(error);  // Логирование ошибки
    });
});

// Обработка команды /stop
bot.onText(/\/stop/, (msg) => {  // Исправлено регулярное выражение для команды
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Пока! ");
});

async function getWeather(city,msg) {
    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        let response = await axios.get(url);
        let weatherData = await response;  // Исправлено .json на вызов функции
        console.log (weatherData) 
        console.log(weatherData.data.main.temp);
        const chatId = msg.chat.id;
         bot.sendMessage(chatId, `Moscow:${weatherData.data.main.temp}`);  
         
    } catch (error) {
        console.error("Ошибка при получении погоды:", error);
    }
}