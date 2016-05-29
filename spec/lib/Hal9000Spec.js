describe('Hal9000', function() {
  var Hal9000 = require('../../lib/Hal9000'),
      Dictionaries = require('../../config/Dictionaries'),
      _ = require('lodash'),
      message = '';

  beforeEach(function() {
    spyOn(_, 'random').and.returnValue(3);
  });

  describe('responder', function() {
    it('has a response based on a matching regex in the dictionary', function() {
      message = { text: "What's the problem?" };
      expect(Hal9000.responder(message)).toEqual(Dictionaries.simpleRegex.problem.text);

      message = { text: 'Hello there!', from: { first_name: 'Dave' } };
      expect(Hal9000.responder(message)).toEqual('Hello Dave.');

      message = { text: 'What about EFG456 unit?' }
      expect(Hal9000.responder(message)).toEqual("I've just picked up a fault in the EFG456 unit. It's going to go 3% failure in 72 hours.");
    });
  });

  describe('unitResponder', function() {
    it ('has a response based on the requested unit name in the message', function() {
      message = { text: 'Tell me about the ABC123 unit.' }
      expect(Hal9000.unitResponder(message.text, Dictionaries.simpleRegex.unit.text)).toEqual("I've just picked up a fault in the ABC123 unit. It's going to go 3% failure in 72 hours.");
      message = { text: 'Tell me about ABC123.' }
      expect(Hal9000.unitResponder(message.text, Dictionaries.simpleRegex.unit.text)).toEqual(undefined);
      message = { text: 'Unit ABC123. Tell me about it!' }
      expect(Hal9000.unitResponder(message.text, Dictionaries.simpleRegex.unit.text)).toEqual(message.text);
    });
  });

  describe('multiReResponder', function() {
    it('matches all regex in an array and responds with a message', function() {
      message = { text: "I don't know what you're talking about, HAL." }
      expect(Hal9000.multiReResponder(message)).toEqual(Dictionaries.multiRegex.dontKnowTalking.text);

      message = { text: 'What are you talking about, HAL?' }
      expect(Hal9000.multiReResponder(message)).toEqual(undefined);
    });
  });
});
