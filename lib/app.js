const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'https://adoring-wright-0eba98.netlify.app/',
    method: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(require('cookie-parser')());

require('./handlers/authHandler')(io);
require('./handlers/chatroomHandler')(io);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = http;
