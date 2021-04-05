// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send({ holamundo: "Hello World!" });
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// const createServer = require("./server");
// const createServer = require("./server");
const createTwitchSocket = require("./twitchSocket");
const chessGame = require("./chess");

console.log('HOLAQUETAL')
// createServer((socket) => {
//   console.log('createServer')
//   const twitchSocket = createTwitchSocket();
//   console.log({ twitchSocket });
//   console.log({ socket });
//   // socket.on();
// });

createTwitchSocket(chessGame);