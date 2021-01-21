const Chatroom = require('../models/Chatroom');
const Message = require('../models/Message');

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

  socket.on('JOIN_ROOM', ({ id, user }) => {
    Chatroom.findById(id)
      .then((room) => {
        socket.join(room.id);
        socket.inRoom = room;
        Message.findMessagesByRoomId(room.id).then((messages) => {
          socket.emit('JOIN_RESULTS', {
            message: `Welcome ${user.name}!`,
            messages,
          });
        });
        socket.broadcast
          .to(room.id)
          .emit('BROADCAST_JOIN', {
            message: `${user.name} has join the room!`,
          });
      })
      .catch((err) => {
        const message = err.message;
        socket.emit('JOIN_RESULTS', { success: false, message });
      });
  });

  socket.on('CHAT_MESSAGE', ({ message, user, roomId }) => {
    Message
      .insert(roomId, user.id, user.name, message)
      .then((message) => {
        console.log(message, 'message');
        io.to(roomId).emit('MESSAGE_RESULTS', message);
      })
      .catch((err) => {
        const message = err.message;
        socket.emit('MESSAGE_RESULTS', { success: false, message });
      });
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    chatroomHandler(io, socket);
  });
};
