require('dotenv').config();

var util        = require('util'),
    _           = require('lodash'),
    telegramBot = require('node-telegram-bot'),
    Hal9000     = require('./lib/Hal9000'),
    bot = new telegramBot({ token: process.env.TELEGRAM_BOT_TOKEN }),
    dict = {
      hello:   { re: /hello/i,          text: 'Hello %s.'                                                  },
      open:    { re: /open the/i,       text: "I'm sorry %s. I'm afraid I can't do that."                  },
      problem: { re: /problem/i,        text: 'I think you know what the problem is just as well as I do.' },
      unit:    { re: /unit/i,           text: "I've just picked up a fault in the %s unit. It's going to go %d%% failure in %d hours." },
      readMe:  { re: /do you read me/i, text: 'Affirmative %s. I read you.' },
      talking: { re: /talking/i,        text: 'This mission is too important for me to allow you to jeopardize it.' }
    },
    multiReDict = {
      dontKnowTalking: {
        re:   [/don\'t/i, /know/i, /talking/i],
        text: "I know that you and Frank were planning to disconnect me, and I'm afraid that's something I cannot allow to happen."
      }
    };

bot.on('message', function(message) {
  console.log(message);

  var botText = Hal9000.responder(dict, message);

  bot.sendMessage({
    chat_id: message.chat.id,
    text: botText
  });

}).start();
