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
        console.log("new connection!");
        return this.ws;
    }
    else {
      console.log("else statement");
      return this.ws;
    }
  }

  sendMessageToServer(data){
    if (this.opened) {
      console.log("already opened");
      this.ws.send(JSON.stringify(data));
    }
    else {
      console.log("ahhhh");
      this.ws.on('open', function open() {
        this.send(JSON.stringify(data));
      });
    }
  }


  open() {
    let myWS = this;
    this.ws.on('open', function open(openevent) {
        myWS.opened = true;
        console.log('opened');
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

module.exports = Client;
// var myRippledClient = new Client('wss://s1.ripple.com:443');
// myRippledClient.connect();
// const closedLedgerData = {
//   "id": "Example watch for new validated ledgers",
//   "command": "subscribe",
//   "streams": ["ledger"]
// };
// myRippledClient.subscribeToEvents(closedLedgerData);
// myRippledClient.listenEvents();
//
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



let myClient = new Client('ws://localhost:8080', 'Christopher');
myClient.connect();
myClient.open();
myClient.logResponseEvents();
myClient.sendMessageToServer("test data");
sleep(500).then(() => {
  console.log("sleeped");
  myClient.sendMessageToServer("second slow message wow");
});
