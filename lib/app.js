const express = require('express');
const app = express();
const http = require('http').createServer(app)

const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });

app.use(express.json());
app.use(require('cookie-parser')());

require('./handlers/messageHandler')(io);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = http;


