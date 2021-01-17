const UserService = require('../services/UserService');

//routes

const authHandler = (io, socket) => {
  socket.on('SIGN_UP', async(user) => {
    try {
      UserService
        .create(user)
        .then(user => {
          socket.emit('SIGN_UP_RESULTS', { user, success: true })
        })
    } catch(err) {
      socket.emit('SIGN_UP_RESULTS', { success: false, err })
    }
  })

  socket.on('LOGIN', async(user) => {
    console.log(user, 'im a user inside login handler woo!');
    try {
      console.log('IM INSIDE LOGIN HANDLER WOO!');
      UserService.authorize(user)
        .then(user => {
          socket.user = user;
          socket.emit('LOGIN_RESULTS', { user, success: true });
        })
    } catch(err) {
      socket.emit('LOGIN_RESULTS', { success: false, err });
    }
  })
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('we have a new connection');
    authHandler(io, socket);
  });
};

