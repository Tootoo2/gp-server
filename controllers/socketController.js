const connections = [];
const users = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("client connected");
    socket.on("userOnline", (data) => {
      connections.push();
    });
    socket.on("disconnect", () => {
      io.emit("userOffline", "I went offline sucker" + socket.id);
    });
  });
};
