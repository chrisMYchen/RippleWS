'use strict'
const WebSocket = require('ws');

class Client {
  constructor(serverUrl) {
    //TODO: URL validation
      this.serverUrl = serverUrl;
      this.ws = undefined;
      this.key = key;
      this.opened = false;
  }

  connect() {
    if (this.ws === undefined) {
        this.ws = new WebSocket(this.serverUrl, {key: this.key});
        return this.ws;
    }
    else {
      return this.ws;
    }
  }

  sendMessageToServer(data){
    if (this.opened) {
      this.ws.send(JSON.stringify(data));
    }
    else {
      this.ws.on('open', function open() {
        this.send(JSON.stringify(data));
      });
    }
  }


  open() {
    let myWS = this;
    this.ws.on('open', function open(openevent) {
        myWS.opened = true;
        console.log(openevent);
    });
  }

  logResponseEvents(){
    this.ws.on('message', function incoming(data, flags) {
      console.log(data);
    });
  }

  close() {
    if (this.ws !== undefined) {
        this.ws.close();
        this.ws = undefined;
    }
  }

}

class RippleNode {
  constructor(myPort) {
    this.port = myPort;
    this.server;
    //what are connecting to other servers
    this.clients = [];
  }

  connectServer() {
    if (this.server === undefined ) {
      this.server = new WebSocket.Server({ port: this.port });
    }
    else {
      return this.server;
    }
  }
  //for "server"
  listenForConnect() {
    //TODO: Check if connected, if not, connect, and then do work.
    this.server.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
      ws.send('something');
    });
  }

  addClient(url) {
      let newClient = Client(url);
      this.clients.push(newClient);
  }

  connectClients() {
    this.clients.forEach(function(client) {
      client.connect();
      client.open();
    });
  }

  logAllClientResponse() {
    this.clients.forEach(function(client) {
      client.logResponseEvents();
    })
  }

  sendMessageToServer(client, data) {
    
  }
}

let rippleNode1 = new RippleNode(9000);
rippleNode1.connectServer();
rippleNode1.listenForConnect();

//TODO: add some command line arguments to specify port for server / what servers i want to clients to
// constructor
// server component to be initialized, port
// and also connect to other "server"/nodes
// listen to all clients that are connected to me
