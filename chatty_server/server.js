// websocket server

const express = require('express');
const uuidV4 = require('uuid/v4');
const SocketServer = require('ws');
const randomColor = require('randomcolor');

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
  const clientColor = randomColor();
  clients.push(socket);
  // Broadcast to all users when a new user joins the connection
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      let payload = { type      : 'userCountUpdate',
                      userCount : (clients.length)
                    };
      payload = JSON.stringify(payload);
      client.send(payload);
    }
  });

  console.log('Client connected');

  socket.on('message', (data) => {
    payload = JSON.parse(data);
    // Prepare payload according to message type
    switch(payload.type) {
      case 'incomingMessage':
        payload.type = 'postMessage';
        payload.id = uuidV4();
        payload.nameColor = clientColor;
        break;
      case 'incomingNotification':
        payload.type = 'postNotification';
        payload.id = uuidV4();
        payload.nameColor = clientColor;
        break;
      case 'incomingImage':
        payload.type = 'postImage';
        payload.id = uuidV4();
        payload.nameColor = clientColor;
        break;
      default:
        // Error handling in case of unrecognized message type
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
    const clientIndex = clients.indexOf(socket);

    if(clientIndex >= 0) {
      clients.splice(clientIndex, 1);
    }
    broadcastUserCount();

    console.log('Client disconnected');
  });
});

//---------- Helper Function

// Broadcast to all users the user count
function broadcastUserCount() {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      let payload = { type      : 'userCountUpdate',
                      userCount : (clients.length)
                    };
      payload = JSON.stringify(payload);
      client.send(payload);
    }
  });
}
