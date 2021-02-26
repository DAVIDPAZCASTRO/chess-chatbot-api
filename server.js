const net = require("net");

// const createServer = () => {
//   const server = net
//     .createServer((socket) => {
//       socket.on("data", (data) => {
//         console.log(data.toString);
//       });
//     })
//     .on("error", (err) => {
//       console.log(err);
//     });

//   server.listen(3000, () => {
//     console.log("Opened server on", server.address().port);
//   });
//   return server;
// };

// const createServer = () => {
//   const io = require("socket.io")();
//   io.on("connection", (client) => {
//     client.on("event", (data) => {
//       console.log("client.on-event", data);
//     });
//     client.on("disconnect", () => {
//       console.log("client.on-disconnect", data);
//     });
//   });
//   io.listen(3000);
// };

const createServer = () => {
  const httpServer = require("http").createServer((req, res) => {
    // serve the index.html file
    res.setHeader("Content-Type", "text/html");
  });

  const io = require("socket.io")(httpServer);

  io.on("connection", (socket) => {
    console.log("connect");
    socket.on('hey', data => {
      console.log('hey', data);
    });
  });

  httpServer.listen(3000, () => {
    console.log("go to http://localhost:3000");
  });
};

// module.exports = createServer;
module.exports = createServer;
