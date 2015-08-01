var WebSocketServer = require('ws').Server;

module.exports.init = function(server) {
  var webSocketServer = new WebSocketServer({server:server});
  
  webSocketServer.addListener('connection', connect);
};

var clients = [];

function connect(webSocketConnection) {
  webSocketConnection.addListener('message', receive(webSocketConnection));
  webSocketConnection.addListener('close', disconnect(webSocketConnection));
  
  clients.push(webSocketConnection);
  
  console.log('client connected with ip: ' + webSocketConnection._socket.remoteAddress);
  console.log('client count: ' + clients.length);
}

function disconnect(webSocketConnection) {
  return function() {
    clients.splice(clients.indexOf(webSocketConnection), 1);
    console.log('client disconnected. remaining: ' + clients.length)
  }
}

function receive(webSocketConnection) {
  return function(message) {
    var parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    
    // if(parsedMessage.type == 'Join')
    //   {
    //     webSocketConnection.username = parsedMessage.data.username;
    //     webSocketConnection.room = parsedMessage.data.room;
        
    //     console.log(parsedMessage.data.username + ' joined room ' + parsedMessage.data.room);
        
    //     if(!(parsedMessage.data.room in rooms))
    //     {
    //       rooms[parsedMessage.data.room] = [];
    //       console.log('new room : ' + parsedMessage.data.room)
    //     }
    //     rooms[parsedMessage.data.room].push(webSocketConnection);
        
    //     updateUserList(parsedMessage.data.room);
    //   }
      
    //   //roomLog();
    //   else if (parsedMessage.type == 'CircleData')
    //   {
    //     for(var i = 0; i < rooms[webSocketConnection.room].length; i++)
    //     {
    //       rooms[webSocketConnection.room][i].send(message);
    //     }
    //   }
  }
}

module.exports.broadcast = function(data) {
  for (var i = 0; i < clients.length; i++) {
    clients[i].send(JSON.stringify(data));
  }
}