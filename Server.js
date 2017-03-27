'use strict';
const WebSocket = require('ws');

class Server{
  constructor(myPort) {
    this.port = myPort;
    this.server;
  }

  connect() {
    if (this.server === undefined ) {
      this.server = new WebSocket.Server({ port: this.port });
    }
    else {
      return this.server;
    }
  }

  listenForConnect() {
    this.server.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
      ws.send('something');
    });
  }

}

let myServer = new Server(8000);
myServer.connect();
myServer.listenForConnect();


// connect
// listen to clients
// broadcast to all its clients
// processMessages from the clients
//clients to connect to it, log a message if it connects
