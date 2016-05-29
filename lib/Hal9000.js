var _ = require('lodash'),
    util = require('util'),
    Dictionaries = require('../config/Dictionaries');

var Hal9000 = {
  responder: function(message) {
    var matchingRegex = {};
    switch (true) {
      case /unit/i.test(message.text):
        responseText = Hal9000.unitResponder(message.text, Dictionaries.simpleRegex.unit.text);
        break;
      default:
        matchingRegex = _.find(Dictionaries.simpleRegex, function (item) { return message.text.match(item.re); });
        if (!_.isEmpty(matchingRegex))
          responseText = matchingRegex.text;
        if (/%s/g.test(responseText))
          responseText = util.format(responseText, message.from.first_name);
      }
    return responseText;
  },
  multiReResponder: function(message) {
    var matchingRegex = {},
        regexArr      = [],
        resultArr     = [];
    matchingRegex = _.find(Dictionaries.multiRegex, function (item) { return message.text.match(item.re[0]); });
    if (_.isEmpty(matchingRegex)) return;
    resultArr = _.map(matchingRegex.re, function(regex) { return regex.test(message.text); });
    if (_.sum(resultArr) == matchingRegex.re.length) return matchingRegex.text;
    return;
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
