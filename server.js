const server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

server.listen(PORT);

console.log(`Listening on PORT ${PORT}`);

let readyPlayerCount = 0;

io.on("connection", (socket) => {
  //check when a user is connected
  console.log("a user connected", socket.id);

  //listening for the ready event from the client
  socket.on("ready", () => {
    console.log("Player ready", socket.id);

    readyPlayerCount++;

    if (readyPlayerCount === 2) {
      //Broadcast startGame event to both players
      //choosing the last player as the referee
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });

  socket.on("disconnect", (socket) => {
    console.log("User with id ... ", socket.id, " disconnected");
  });
});
