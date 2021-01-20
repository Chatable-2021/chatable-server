const UserService = require('../services/UserService');
const User = require('../models/User');

const authHandler = (io, socket) => {
  socket.on('SIGN_UP', (user) => {

  User
    .checkEmail(user.email)
    .then(() => {
      UserService
        .create(user)
        .then((user) => {
          console.log(user, 'THIS IS USER');
          socket.emit('AUTH_RESULTS', { user, success: true });
        })
        .catch((err) => {
          const message = err.message;
          socket.emit('AUTH_RESULTS', { success: false, message });
        });
    })
    .catch(err => {
      const message = err.message;
      console.log(message, 'ERR MESSAGE')
      socket.emit('AUTH_RESULTS', { success: false, message })
    })
  });

  socket.on('LOGIN', (user) => {
    UserService
      .authorize(user)
      .then((user) => {
        socket.user = user;
        socket.emit('AUTH_RESULTS', { user, success: true });
      })
      .catch((err) => {
        const message = err.message;
        socket.emit('AUTH_RESULTS', { success: false, message });
      });
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('we have a new connection');
    authHandler(io, socket);
  });
};
