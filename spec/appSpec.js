describe('Hal9000', function() {
  var Hal9000 = require('../App.js'),
      _ = require('lodash'),
      message = '',
      dict = {
        responseOne: { re: /hi/gi,   text: 'Hi there stranger!' },
        responseTwo: { re: /name/gi, text: 'Your name is %s.'   },
        unit:        { re: /unit/i                              }
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
      expect(Hal9000.unitResponder(message)).toEqual("I've just picked up a fault in the ABC123 unit. It's going to go 3% failure in 72 hours.");
      message = { text: 'Tell me about ABC123.' }
      expect(Hal9000.unitResponder(message)).toEqual(undefined);
      message = { text: 'Unit ABC123. Tell me about it!' }
      expect(Hal9000.unitResponder(message)).toEqual(message.text);
    });
  });

});
