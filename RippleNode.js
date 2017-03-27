'use strict';
const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const Server = require('./Server');
const Client = require('./Client');

class RippleNode {
  constructor(myPort, id){
    this.port = myPort;
    this.id = id;
    this.server = new Server(this.port);
    this.connections = [];
    this.server.listen();
  }

  //list of urls
  connect(urls) {
    console.log(urls);
    let node = this;
    urls.forEach(function createClientConnection(url) {
      console.log(url);
      let myClient = new Client(url, id);
      myClient.connect();
      myClient.open();
      myClient.logResponseEvents();
      node.connections.push(myClient);
    });
  }

  //when node acts as client
  logAllResponses() {
    this.connections.forEach(function listen(client) {
      console.log("in client");
      client.logResponseEvents();
    })
  }

  sendMessageFromAClient(cnxn, message) {
    //TODO: Identify specific clients
    cnxn.sendMessageToServer(message);
  }

  //when node acts as server
  broadcast(message) {
    this.server.broadcast(message);
  }
}


var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
let port = argv['port'];
let urls = argv['urls'];
let id = argv['id'];
let myNode = new RippleNode(port, id);
let urlsList = [];
myNode.logAllResponses();
console.log(urls);
if (urls) {
  urlsList = urls.split(",");
  myNode.connect(urlsList);
  myNode.sendMessageFromAClient(myNode.connections[0], "Message from node client side");
}
