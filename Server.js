'use strict';
const WebSocket = require('ws');
const express = require('express');
const http = require('http');

class Server {
    constructor(myPort) {
      this.port = myPort;
      this.server = new WebSocket.Server({port: this.port});
    }

    listen() {
      let my_obj = this;
      this.server.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
          my_obj.processMessage(message);
          // console.log(ws);
          my_obj.broadcast("new client connected!");
        });
        my_obj.sendMessage('hello!', ws);
      });
    }

    processMessage(message) {
      //based on message type, we do something different
      console.log('received: %s', message);
    }

    sendMessage(message, ws) {
      ws.send(message);
    }

    broadcast(message) {
      this.server.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
};

module.exports = Server;
//
let myServer = new Server(8080);
myServer.listen();
