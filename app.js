require('dotenv').config();

var util        = require('util'),
    _           = require('lodash'),
    telegramBot = require('node-telegram-bot'),
    bot = new telegramBot({ token: process.env.TELEGRAM_BOT_TOKEN });
    dict = {
      hello:   { re: /hello/i,          text: 'Hello %s.'                                                  },
      open:    { re: /open the/i,       text: "I'm sorry %s. I'm afraid I can't do that."                  },
      problem: { re: /problem/i,        text: 'I think you know what the problem is just as well as I do.' },
      unit:    { re: /unit/i,           text: "I've just picked up a fault in the %s unit. It's going to go %d%% failure in %d hours." },
      readMe:  { re: /do you read me/i, text: 'Affirmative %s. I read you.' },
      talking: { re: /talking/i,        text: 'This mission is too important for me to allow you to jeopardize it.' }
    };

var Hal9000 = {
  responder: function(dict, message) {
    var responseText = '',
        responseArr  = [];
    switch (true) {
      case dict.unit.re.test(message.text):
        responseText = Hal9000.unitResponder(message);
        break;
      default:
        responseArr = _.map(dict, function (item) {
          if (item.re.test(message.text)) {
            if (/%s/g.test(item.text))
              return util.format(item.text, message.from.first_name);
            return item.text;
          }
        });
        responseText = _.join(responseArr, '');
      }
    return responseText;
  },
  unitResponder: function(message) {
    var wordArr = [],
        unitWordIndex = -1,
        unitName = '',
        percentFailure = _.random(1, 100),
        hourFailure = _.random(1, 3) * 24,
        responseText = message.text;

    if(!dict.unit.re.test(message.text)) return;

    wordArr = _.words(message.text, /[a-z\d]+/gi);
    unitWordIndex = _.findIndex(wordArr, function(w) { return w == 'unit'; });
    if(unitWordIndex > 0) {
      unitName = wordArr[unitWordIndex - 1];
      responseText = util.format(dict.unit.text, unitName, percentFailure, hourFailure);
    }
    return responseText;
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
