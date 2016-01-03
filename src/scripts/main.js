var $ = require('jquery');
var init = require('./init');
var messages = require('./messages');

init();

$(function() {
  $("#show-message1").on("click", function() {
    console.debug('message1 clicked');
    $("#message1").text(messages.get("message1"));
  });
  $("#show-message2").on("click", function() {
    console.debug('message2 clicked');
    $("#message2").text(messages.get("message2"));
  });
});