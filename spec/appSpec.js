describe('Hal9000', function() {
  var Hal9000 = require('../lib/Hal9000.js'),
      _ = require('lodash'),
      message = '',
      dict = {
        responseOne: { re: /hi/i,   text: 'Hi there stranger!' },
        responseTwo: { re: /name/i, text: 'Your name is %s.'   },
        unit:          { re: /unit/i, text: "I've just picked up a fault in the %s unit. It's going to go %d%% failure in %d hours." }
      },
      multiReDict = {
        responseThree: { re: [/don\'t/i, /know/i, /talking/i], text: "I know that you and Frank were planning to disconnect me, and I'm afraid that's something I cannot allow to happen." }
      };

  beforeEach(function() {
    spyOn(_, 'random').and.returnValue(3);
  });

  describe('responder', function() {
    it('has a response based on a matching regex in the dictionary', function() {
      message = { text: 'Hi! Are you there?' };
      expect(Hal9000.responder(dict, message)).toEqual(dict.responseOne.text);

      message = { text: 'Say my name, say my name.', from: { first_name: 'Dave' } };
      expect(Hal9000.responder(dict, message)).toEqual('Your name is Dave.');

      message = { text: 'What about EFG456 unit?' }
      expect(Hal9000.responder(dict, message)).toEqual("I've just picked up a fault in the EFG456 unit. It's going to go 3% failure in 72 hours.");
    });
  });

  describe('unitResponder', function() {
    it ('has a response based on the requested unit name in the message', function() {
      message = { text: 'Tell me about the ABC123 unit.' }
      expect(Hal9000.unitResponder(dict, message)).toEqual("I've just picked up a fault in the ABC123 unit. It's going to go 3% failure in 72 hours.");
      message = { text: 'Tell me about ABC123.' }
      expect(Hal9000.unitResponder(dict, message)).toEqual(undefined);
      message = { text: 'Unit ABC123. Tell me about it!' }
      expect(Hal9000.unitResponder(dict, message)).toEqual(message.text);
    });
  });

  describe('multiReResponder', function() {
    it('matches all regex in an array and responds with a message', function() {
      message = { text: "I don't know what you're talking about, HAL." }
      expect(Hal9000.multiReResponder(multiReDict, message)).toEqual(multiReDict.text);

      message = { text: "What are you talking about, HAL?" }
      expect(Hal9000.multiReResponder(multiReDict, message)).toEqual(undefined);
    });
  });
});
