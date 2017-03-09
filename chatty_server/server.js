// websocket server

const express = require('express');
const uuidV4 = require('uuid/v4');
const SocketServer = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`LISTENING ON ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

const clients = [];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (socket) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      let payload = { type      : 'userCountUpdate',
                        userCount : (clients.length + 1)
                      };
      payload = JSON.stringify(payload);
      client.send(payload);
    }
  });
  clients.push(socket);

  console.log('Client connected');
  console.log(SocketServer);

  socket.on('message', (data) => {
    payload = JSON.parse(data);

    switch(payload.type) {
      case 'incomingMessage':
        payload.type = 'postMessage';
        payload.id = uuidV4();
        break;
      case 'incomingNotification':
        payload.type = 'postNotification';
        payload.id = uuidV4();
        break;
      default:
        // show error in console if message is not a known type
        throw new Error(`Unknown data type at`)
    }
    payload = JSON.stringify(payload);
    wss.clients.forEach(function each(client) {
      if (client.readyState === SocketServer.OPEN) {
        client.send(payload);
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => {
    clients.forEach((client, index) => {
      if (client === socket) {
        clients.splice(index, 1);
        return
      }
    });
    wss.clients.forEach(function each(client) {
      if (client.readyState === SocketServer.OPEN) {
        let payload = { type      : 'userCountUpdate',
                        userCount : (clients.length - 1)
                      };
        payload = JSON.stringify(payload);
        client.send(payload);
      }
    });
    console.log('Client disconnected')
  });
});
