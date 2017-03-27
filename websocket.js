const WebSocket = require('ws');

const ws = new WebSocket('wss://s1.ripple.com:443');


ws.on('open', function open() {
  data = {
  "id": "Example watch for new validated ledgers",
  "command": "subscribe",
  "streams": ["ledger"]
  };
  ws.send(JSON.stringify(data));
});

ws.on('message', function incoming(data, flags) {
  console.log(data);
});
