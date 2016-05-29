var _ = require('lodash'),
    util = require('util');
var Hal9000 = {
  responder: function(dict, message) {
    var responseText = '',
        responseArr  = [];
    switch (true) {
      case /unit/i.test(message.text):
        responseText = Hal9000.unitResponder(dict, message);
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
  multiReResponder: function(dict, message) {
    _.map(dict, function (item) {
      resultArr = _.map(item.re, function(regEx) { return regEx.test(message.text); });
      if (_.sum(resultArr) == item.re.length) return item.text;
    });
    return;
  },
  unitResponder: function(dict, message) {
    var wordArr = [],
        unitWordIndex = -1,
        unitName = '',
        percentFailure = _.random(1, 100),
        hourFailure = _.random(1, 3) * 24,
        responseText = message.text;

    if(!/unit/i.test(message.text)) return;

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
