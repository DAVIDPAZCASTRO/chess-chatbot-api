const io = require("socket.io");

const createServer = (cb) => {
  const httpServer = require("http").createServer();
  const socketServer = io(httpServer);

  socketServer.on("connection", (socket) => {
    console.log("connect");
    socket.onAny((data) => {
      console.log("hey", data);
    });
    cb(socket);
  });
  socketServer.on("error", console.log);
  httpServer.listen(3000);
};

// module.exports = createServer;
module.exports = createServer;
