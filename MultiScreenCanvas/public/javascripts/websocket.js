'use strict';

// var webSocket = new WebSocket('ws://localhost:3000/');
var webSocket = new WebSocket('ws://' + location.host + '/');

webSocket.addEventListener('open', function (e) {
  console.log('Connection open.')
}, false);

webSocket.addEventListener('close', function (e) {
  console.log('Connection closed.')
}, false);

// webSocket.addEventListener('message', function (message) {
//   console.log('Incoming message:' + message.data);
// }, false);

webSocket.addEventListener('message', function (message) {
  execute(JSON.parse(message.data));
}, false);

webSocket.addEventListener('error', function (e) {
  console.log('Error:' + e.data)
}, false);