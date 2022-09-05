const app = require("./app");
const sockets = require("./sockets");

const http = require("http")
const io = require("socket.io")

const httpServer = http.createServer(app);
const socketServer = io(httpServer);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

sockets.listen(socketServer);
