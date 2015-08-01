var broadcast;

function draw() {
  for (var i = 0; i < clients.length; i++) {
    clients[i].send(JSON.stringify({data:"sajt"}));
  }
}

var x = 0;

var pos = {x:0, y:0};
var dir = {x:1, y:1};


function update() {
  if (pos.x < -250 || pos.x > 250) {
    dir.x *= -1;
  }
  if (pos.y < -250 || pos.y > 250) {
    dir.y *= -1;
  }
  
  pos.x += dir.x * 3;
  pos.y += dir.y * 5;
  
  broadcast({pos:pos});
}


module.exports.init = function(ws) {
  broadcast = ws.broadcast;
  setInterval(update, 20);
}