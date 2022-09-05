let readyPlayerCount = 0;

function listen(io) {
  const pongNameSpace = io.of("/pong");
  pongNameSpace.on("connection", (socket) => {
    let room;

    //check when a user is connected
    console.log("a user connected", socket.id);

    //listening for the ready event from the client
    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);

      console.log("Player ready", socket.id, room);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        //Broadcast startGame event to both players
        //choosing the last player as the referee
        pongNameSpace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      socket.leave(room);
      console.log("Client " + socket.id + " disconnected: " + reason);
    });
  });
}

module.exports = {
  listen,
};
