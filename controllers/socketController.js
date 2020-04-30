const connections = [];
const users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('client connected');
    socket.on('userOnline', (data) => {
      data.sockets = [socket.id];
      if (users.length === 0) {
        users.push(data);
      } else {
        users.map((user, i) =>
          user._id === data._id
            ? bindSocketToUser(i, socket.id)
            : users.push(data)
        );
      }
      socket.emit("onlineUsers", users)
    });
    socket.on('disconnect', () => {
      removeSocket(socket.id);
      io.emit('onlineUsers', users);
    });
  });
};

const bindSocketToUser = (index, id) => {
  users[index].sockets.push(id);
};

const removeSocket = (id) => {
  users.map((user) =>
    user.sockets.map((socket, i) => socket === id && user.sockets.splice(i, 1))
  );
  users.map((user, i) => user.sockets.length <= 0 && users.splice(i, 1));
};
