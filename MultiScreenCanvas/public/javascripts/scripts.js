'use strict';

window.addEventListener('load', init, false);

var params = {};

var canvas, context;
var area;

function init() {
  if (location.hash == "") {
    location.hash = "#0;0@0";
  }
  
  var raw = location.hash.substr(1);
  
  var splitted = raw.split('@');
  params.zoom = parseInt(splitted[1]);
  splitted = splitted[0].split(';');
  
  params.position = {};
  params.position.x = parseInt(splitted[0]);
  params.position.y = parseInt(splitted[1]);
  
  // console.log(JSON.stringify(params));
  
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  area = [0, 0, 100, 100];
  
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  
  // context.translate(params.position[0], params.position[1]);
  
  // test();
  
  window.addEventListener('keydown', keyPress, false);
}

function execute(data) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  var pos = data.pos;
  
  context.beginPath();
  context.arc(pos.x + params.position.x, pos.y + params.position.y, 70, 0, 2 * Math.PI, false);
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

function keyPress(e) {
  if (e.keyCode == 38) {
    params.position.y -= e.shiftKey ? 15 : 1;
  }
  else if (e.keyCode == 40) {
    params.position.y += e.shiftKey ? 15 : 1;
  }
  else if (e.keyCode == 37) {
    params.position.x -= e.shiftKey ? 15 : 1;
  }
  else if (e.keyCode == 39) {
    params.position.x += e.shiftKey ? 15 : 1;
  }
  
  location.hash = '#' + params.position.x + ';' + params.position.y + '@' + params.zoom;
}