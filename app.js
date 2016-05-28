require('dotenv').config();

var util        = require('util'),
    _           = require('lodash'),
    telegramBot = require('node-telegram-bot'),
    bot = new telegramBot({ token: process.env.TELEGRAM_BOT_TOKEN });
    dict = {
      hello:   { re: /hello/gi,    text: 'Hello %s.'                                                  },
      open:    { re: /open the/gi, text: "I'm sorry %s. I'm afraid I can't do that."                  },
      problem: { re: /problem/gi,  text: 'I think you know what the problem is just as well as I do.' }
    };

var Hal9000 = {
  responder: function(dict, message) {
    var responseArr = _.map(dict, function (item) {
      var responseText = '';
      if (item.re.test(message.text)) {
        responseText = item.text;
        if (/%s/g.test(item.text))
          responseText = util.format(item.text, message.from.first_name);
      }
      return responseText;
    });
    return _.join(responseArr, '');
  }
};

module.exports = Hal9000;

bot.on('message', function(message) {
  console.log(message);

  var botText = Hal9000.responder(dict, message);

  bot.sendMessage({
    chat_id: message.chat.id,
    text: botText
  });

}).start();
