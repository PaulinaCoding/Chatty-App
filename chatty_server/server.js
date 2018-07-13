const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    console.log(data)
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  wss.broadcast(JSON.stringify({
  type: 'usersNumber', 
  count: wss.clients.size}));
  
  console.log('Number of users went up to:',wss.clients.size)
  
  ws.on('message', function incoming(data) {
    const incomingMessage = JSON.parse(data);

    
//Changing the postNotifactions to incomingNotification
    incomingMessage.type = incomingMessage.type.replace('post', 'incoming');

    const outgoingMessage = {
      id: uuidv4(),
      ...incomingMessage
    }
  
    wss.broadcast(JSON.stringify(outgoingMessage));

  });
  
  console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
      wss.broadcast(JSON.stringify({type: 'usersNumber', count: wss.clients.size }))
      console.log('Client disconnected')
      console.log('Number of users went down to: ', wss.clients.size)
    })
  
});