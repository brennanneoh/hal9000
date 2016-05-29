var _ = require('lodash'),
    util = require('util'),
    Dictionaries = require('../config/dictionaries');

var Hal9000 = {
  responder: function(message) {
    var responseText = '',
        responseArr  = [];
    switch (true) {
      case /unit/i.test(message.text):
        responseText = Hal9000.unitResponder(message.text, Dictionaries.simpleRegex.unit.text);
        break;
      default:
        responseArr = _.map(Dictionaries.simpleRegex, function (item) {
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
  multiReResponder: function(message) {
    var responseText = '',
        responseArr  = [];
    responseArr = _.map(Dictionaries.multiRegex, function (item) {
      resultArr = _.map(item.re, function(regex) { return regex.test(message.text); });
      if (_.sum(resultArr) == item.re.length) return item.text;
    });
    responseText = _.join(responseArr, '');
    return responseText;
  },
  unitResponder: function(messageText, responseText) {
    var wordArr = [],
        unitWordIndex = -1,
        unitName = '',
        percentFailure = _.random(1, 100),
        hourFailure = _.random(1, 3) * 24;

    if(!/unit/i.test(messageText)) return;

    wordArr = _.words(messageText, /[a-z\d]+/gi);
    unitWordIndex = _.findIndex(wordArr, function(w) { return w == 'unit'; });
    if(unitWordIndex > 0) {
      unitName = wordArr[unitWordIndex - 1];
      responseText = util.format(responseText, unitName, percentFailure, hourFailure);
    }
    else {
      responseText = messageText;
    }
    return responseText;
  }
};

module.exports = Hal9000;
