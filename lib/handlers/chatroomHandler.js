const Chatroom = require('../models/Chatroom');

const chatroomHandler = (io, socket) => {
  socket.on('CREATE_CHATROOM', async(chatroom) => {
    try {
      Chatroom
        .create(chatroom)
        .then(rooms => {
          socket.emit('ROOMS_RESULTS', { rooms, success: true })
        });
    } catch(err) {
      socket.emit('ROOMS_RESULTS', { success: false, err })
    }
  });

  socket.on('GET_ROOMS', async() => {
    try {
      Chatroom
        .getRooms()
        .then(rooms => {
          socket.emit('ROOMS_RESULTS', { rooms, success: true })
        })
    } catch(err) {
      socket.emit('ROOMS_RESULTS', { success: false })
    }
  });


  socket.on('JOIN_ROOM', async(roomId) => {
    console.log(room, 'THIS IS THE ROOM!');
    const room = await Chatroom.findById(roomId);
    socket.join(room.id);
    socket.inRoom = room;
    //socket.inRoom.id
  });
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    chatroomHandler(io, socket);
  });
};
