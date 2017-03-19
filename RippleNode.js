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
  }
  //list of urls
  connect(urls) {
    urls.forEach(function createClientConnection(url) {
      let myClient = new Client(url, id);
      connections.push(myClient);
    });
  }

  //when node acts as client
  logAllResponses() {
    this.connections.forEach(function listen(client) {
      client.logResponseEvents();
    })
  }


}


var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
