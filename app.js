require('dotenv').config();

var TelegramBot  = require('node-telegram-bot'),
    Hal9000      = require('./lib/Hal9000'),
    Dictionaries = require('./config/Dictionaries'),
    bot = new TelegramBot({ token: process.env.TELEGRAM_BOT_TOKEN });

bot.on('message', function(message) {
  console.log(message);

  var botText = Hal9000.responder(message);

  bot.sendMessage({
    chat_id: message.chat.id,
    text: botText
  });

}).start();
