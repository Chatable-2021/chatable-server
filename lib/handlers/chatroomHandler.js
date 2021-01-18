const Chatroom = require('../models/Chatroom');

const chatroomHandler = (io, socket) => {
  socket.on('CREATE_CHATROOM', async(chatroom) => {
    try {
      Chatroom
        .create(chatroom)
        .then(chatroom => {
          socket.emit('CHATROOM_RESULTS', { chatroom, success: true })
        })
    } catch(err) {
      socket.emit('CHATROOM_RESULTS', { success: false, err })
    }
  })
}

modeul.exports = (io) => {
  io.on('connection', (socket) => {
    chatroomHandler(io, socket);
  });
};
