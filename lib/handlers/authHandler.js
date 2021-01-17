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
    try {
      const { email, password } = user;
      const user = await UserService.authorize(email, password);
      socket.user = user;
      sock.emit('LOGIN_RESULTS', { user, success: true });
    } catch(err) {
      socket.emit('LOGIN_RESULTS', { success: false, err });
    }
  })
}

// const handler = (io, socket) => {
//   socket.on('LOGIN', async({ email, password }) => {
//     const user = await UserServices.authorize(email, password)
//     socket.user = user;
//     socket.emit('LOGIN_RESULTS', user);
//   })


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('we have a new connection');
    authHandler(io, socket);
  });
};

