const handler = (io, socket) => {
  socket.on('disconnect', () => {
    console.log('USER has left');
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('we have a new connection');
    handler(io, socket);
  });
};
