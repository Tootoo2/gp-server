module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("client connected");
    socket.on("userOnline", (data) => console.log(data));
    socket.on("disconnect", () => {
      io.emit("userOffline", "I went offline sucker" + socket.id);
      console.log("Client disconnected");
    });
  });
};
