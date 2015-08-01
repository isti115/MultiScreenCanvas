'use strict';

window.addEventListener('load', init, false);

var data = {};

var canvas, context;
var area;

function init() {
  var raw = location.hash.substr(1);
  
  var splitted = raw.split('@');
  data.position = splitted[0].split(';');
  data.zoom = splitted[1];
  
  console.log(JSON.stringify(data));
  
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  area = [0, 0, 100, 100];
  
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  
  context.translate(data.position[0], data.position[1]);
  
  // test();
}

function execute(data) {
  context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  
  var pos = data.pos;
  
  context.beginPath();
  context.arc(pos.x, pos.y, 70, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = '#003300';
  context.stroke();
}

var x = 0;

function test() {
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = 10;
  
  context.translate(centerX, centerY);
  context.scale(21, 21);
  
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = '#003300';
  context.stroke();
}

canvas.addEventListener("keydown", function() {
  
}, false);