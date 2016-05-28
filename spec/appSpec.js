describe('Hal9000', function () {
  var App = require('../app.js');
  var dict = {
    responseOne: { re: /hi/gi, text: 'Hi there stranger!' },
    responseTwo: { re: /name/gi, text: 'Your name is %s.' }
  };
  var message = '';

  it('has a response based on a matching regex in the dictionary', function () {
    message = { text: 'Hi! Are you there?' };
    expect(App.responder(dict, message)).toEqual(dict.responseOne.text);

    message = {
      text: 'Say my name, say my name.',
      from: {
        first_name: 'Dave'
      }
    };
    expect(App.responder(dict, message)).toEqual('Your name is Dave.');
  });

});
