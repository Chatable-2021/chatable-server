const UserService = require('../services/UserService');

//routes

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

