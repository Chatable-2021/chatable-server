const Chatroom = require('../models/Chatroom');

const chatroomHandler = (io, socket) => {
  socket.on('CREATE_CHATROOM', (chatroom) => {
    Chatroom.create(chatroom)
      .then((rooms) => {
        socket.emit('ROOMS_RESULTS', { rooms, success: true });
      })
      .catch((err) => {
        socket.emit('ROOMS_RESULTS', { success: false, err });
      });
  });

  socket.on('GET_ROOMS', () => {
    Chatroom.getRooms()
      .then((rooms) => {
        socket.emit('ROOMS_RESULTS', { rooms, success: true });
      })
      .catch((err) => {
        socket.emit('ROOMS_RESULTS', { success: false, err });
      });
  });

  socket.on('JOIN_ROOM', (roomId) => {
    Chatroom.finById(roomId)
      .then((room) => {
        socket.join(room.id);
        socket.inRoom = room;
      })
      .catch((err) => {
        socket.emit('JOIN_RESULTS', { success: false, err });
      });
    //socket.inRoom.id
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    chatroomHandler(io, socket);
  });
};
