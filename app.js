var util        = require('util'),
    _           = require('lodash'),
    telegramBot = require('node-telegram-bot')

require('dotenv').config()

var bot = new telegramBot({ token: process.env.TELEGRAM_BOT_TOKEN })

var dict = {}
dict['hello'] = { re: /hello/gi, text: 'Hello %s.' }
dict['open'] = { re: /open the/gi, text: "I'm sorry %s. I'm afraid I can't do that." }
dict['problem'] = { re: /problem/gi, text: 'I think you know what the problem is just as well as I do.' }

bot.on('message', function (message) {
  console.log(message)

  var bot_text = '';

  _.map(dict, function (item) {
    if (item.re.test(message.text)) {
      bot_text = util.format(item.text, message.from.first_name);
    }
  });

  bot.sendMessage({
    chat_id: message.chat.id,
    text: bot_text
  });

}).start();
