// TWITCH
const tmi = require("tmi.js");

const createTwitchSocket = (chessGame) => {
  // Define configuration options
  const opts = {
    identity: {
      username: "ChessBot",
      password: "oauth:c5kywkbzl0w3ot96s0ighc597ycvcc",
    },
    channels: ["pzcoluraido"],
  };
  // Create a client with our options
  const client = new tmi.client(opts);

  // Register our event handlers (defined below)
  client.on("message", onMessageHandler);
  client.on("connected", onConnectedHandler);

  // Connect to Twitch:
  client.connect();

  // Called every time a message comes in
  function onMessageHandler(target, context, msg, self) {
    if (self) {
      return;
    } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();
    const [command, param = ""] = msg.split(" ");
    console.log({ command });
    console.log({ target });
    console.log({ context });
    console.log({ self });
    const username = context.username;
    // If the command is known, let's execute it
    let text = "";
    switch (command) {
      case "!dice":
        console.log("ENTRAAAA");
        client.say(username, `You rolled a ${rollDice()}`);
        console.log(`* Executed ${command} command`);
        break;
      case "!info":
        text = chessGame.paintData();
        text && client.say(target, text);
        break;
      case "!help":
        text = chessGame.getHelp(username);
        text && client.say(target, text);
        break;
      case "!caption":
        text = chessGame.getCaption(username);
        text && client.say(target, text);
        break;
      case "!board":
        text = chessGame.board(username);
        text && client.say(target, text);
        break;
      case "!chess":
        text = chessGame.startGame(username);
        text && client.say(target, text);
        break;
      case "!play":
        text = chessGame.addPlayer(username);
        text && client.say(target, text);
        break;
      case "!move":
        text = chessGame.setPlayerMove(username, param);
        text && client.say(target, text);
        break;
      case "!possibleMoves":
        text = chessGame.getPossibleMoves(username);
        text && client.say(target, text);
        break;
      case "!finishGame":
        text = chessGame.finishGame(username);
        text && client.say(target, text);
        break;
      case "!history":
        break;
      case 6:
        break;
    }
    // if (commandName === "!dice") {

    // } else {
    //   console.log(`* Unknown command ${commandName}`);
    // }
  }

  // Function called when the "dice" command is issued
  function rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
  }

  // Called every time the bot connects to Twitch chat
  function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }

  return client;
};

module.exports = createTwitchSocket;
