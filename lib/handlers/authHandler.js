const UserService = require('../services/UserService');

const authHandler = (io, socket) => {
  socket.on('SIGN_UP', async(user) => {
    try {
      UserService
        .create(user)
        .then(user => {
          socket.emit('AUTH_RESULTS', { user, success: true })
        })
    } catch(err) {
      socket.emit('AUTH_RESULTS', { success: false, err })
    }
  })

  socket.on('LOGIN', async(user) => {
    try {
      UserService
        .authorize(user)
        .then(user => {
          socket.user = user;
          socket.emit('AUTH_RESULTS', { user, success: true });
        })
    } catch(err) {
      socket.emit('AUTH_RESULTS', { success: false, err });
    }
  })
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('we have a new connection');
    authHandler(io, socket);
  });
};

