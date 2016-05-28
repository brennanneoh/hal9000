var telegramBot = require('node-telegram-bot')
var bot = new telegramBot({ token: process.env.TELEGRAM_BOT_TOKEN })

bot.on('message', function (message) {
  console.log(message)
  if (/hello/gi.test(message.text)) {
    bot.sendMessage({
      chat_id: message.chat.id,
      text: 'Hello ' + message.from.first_name + '.'
    })
  }
  if (/open the/gi.test(message.text)) {
    bot.sendMessage({
      chat_id: message.chat.id,
      text: "I'm sorry " + message.from.first_name + ". I'm afraid I can't do that."
    })
  }
  if (/problem/gi.test(message.text)) {
    bot.sendMessage({
      chat_id: message.chat.id,
      text: "I think you know what the problem is just as well as I do."
    })
  }
}).start();

