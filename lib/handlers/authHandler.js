const UserService = require('../services/UserService');

cont UserService = require('../services/UserService');

const authHandler = (io, socket) => {
  socket.on('signup', async(user) => {
    console.log(user);
  })
}