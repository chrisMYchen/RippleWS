'use strict';
const WebSocket = require('ws');


class Client {
  constructor(serverUrl, key) {
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
//
// var myRippledClient = new Client('wss://s1.ripple.com:443');
// myRippledClient.connect();
// const closedLedgerData = {
//   "id": "Closed Ledgers",
//   "command": "subscribe",
//   "streams": ["ledger"]
// };
// myRippledClient.sendMessageToServer(closedLedgerData);
// myRippledClient.logResponseEvents();

//.on(something) is an event emitter in node.

let myClient = new Client('ws://localhost:8000');
myClient.connect();
myClient.sendMessageToServer("Hi! I'm a client.")
myClient.logResponseEvents();
