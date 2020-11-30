const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const pako = require('pako');

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server: server });

let data = fs.readFileSync(path.join(__dirname, '/uploads/test.json'));

wss.on('connection', (ws) => {
  ws.on('message', (update) => {
    // const uncompress = pako.ungzip(message, { to: 'string' });
    // const msg = decodeURIComponent(uncompress);

    // console.log('received: %s', update);
    if (update !== 'rub') {
      const data = JSON.parse(update);
      const _u = JSON.stringify({
        type: 2,
        data: JSON.stringify({
          t: 'v',
          i: '1',
          v: {
            ct: {
              fa: '0.00\\ "ha"',
            },
            fs: 10,
            ff: 1,
            ht: 2,
            vt: 0,
            tb: 2,
            v: 34.5,
            m: '34.50 ha',
          },
          r: 6,
          c: 4,
        }),
      });
      ws.send(update);
    }
  });
  console.log('ON_CONNECTION');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
