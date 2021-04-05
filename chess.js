const { Chess } = require("chess.js");

const getTextPlayerColor = (playerColor) => {
  if (playerColor === "w") return "blancas";
  if (playerColor === "b") return "negras";
};

// const paintPiece = (piece, color) => {
//   const isWhite = color === "w";
//   switch (piece) {
//     case "r":
//       return isWhite ? "♖" : "♜";
//     case "n":
//       return isWhite ? "♘" : "♞";
//     case "b":
//       return isWhite ? "♗" : "♝";
//     case "q":
//       return isWhite ? "♕" : "♛";
//     case "k":
//       return isWhite ? "♔" : "♚";
//     case "p":
//       return isWhite ? "♙" : "♟";
//   }
// };

const paintPiece = (piece, color) => {
  const isWhite = color === "w";
  switch (piece) {
    case "r":
      return isWhite ? "🅁" : "🆁";
    case "n":
      return isWhite ? "🄽‍" : "🅽";
    case "b":
      return isWhite ? "🄱" : "🅱";
    case "q":
      return isWhite ? "🅀" : "🆀";
    case "k":
      return isWhite ? "🄺‍" : "🅺";
    case "p":
      return isWhite ? "🄿" : "🅿";
  }
};

const paintSquare = (backgroundWhite) => {
  return backgroundWhite ? "⓪" : "⓿";
};

const paintCaption = () => {
  return "Leyenda: \n🄿 ➝ Peón blancas, 🅁 ➝ Torre blancas, 🄽‍ ➝ Caballo blancas, 🄱 ➝ Alfil blancas, 🅀 ➝ Reina blancas, 🄺‍ ➝ Rey blancas, 🅿 ➝ Peón negras, 🆁 ➝ Torre negras, 🅽 ➝ Caballo negras, 🅱 ➝ Alfil negras, 🆀 ➝ Reina negras, 🅺 ➝ Rey negras, ⓪ ➝ Casilla vacía de fondo blanco, ⓿ ➝ Casilla vacía de fondo negro";
};

const paintCommandsHelp = () => {
  return "Comandos: \n!chess ➝ Crear la partida, !play ➝ Participar como segundo jugador, !finishGame ➝ Borrar la partida actual, !move [movimiento] ➝ Mover ficha si es su turno (método algebraico), !possibleMoves ➝ Ver los movimientos posibles si es su turno, !board ➝ Ver el estado del tablero y de quien es el turno, !caption ➝ Consultar leyenda. Si un usuario no participa en el juego, se ignoararán para él la mayor parte de los comandos.";
};

//   ╔═╤═╤═╤═╤═╤═╤═╤═╗╮
//   ║♜│♞│♝│♛│♚│♝│♞│♜║8
//   ╟─┼─┼─┼─┼─┼─┼─┼─╢┊
//   ║♟│♟│♟│♟│♟│♟│♟│♟║7
//   ╟─┼─┼─┼─┼─┼─┼─┼─╢┊
//   ║▓│░│▓│░│▓│░│▓│░║6
//   ╟─┼─┼─┼─┼─┼─┼─┼─╢┊
//   ║░│ │░│ │░│ │░│ ║5
//   ╟─┼─┼─┼─┼─┼─┼─┼─╢┊
//   ║ │░│ │░│ │░│ │░║4
//   ╟─┼─┼─┼─┼─┼─┼─┼─╢┊
//   ║░│ │░│ │░│ │░│ ║3
//   ╟─┼─┼─┼─┼─┼─┼─┼─╢┊
//   ║♙│♙│♙│♙│♙│♙│♙│♙║2
//   ╟─┼─┼─┼─┼─┼─┼─┼─╢┊
//   ║♖│♘│♗│♕│♔│♗│♘│♖║1
//   ╚═╧═╧═╧═╧═╧═╧═╧═╝┊
//   ╰a┈b┈c┈d┈e┈f┈g┈h┈╯

// 🆁🅽🅱🆀🅺🅱🅽🆁❶
// 🅿🅿🅿🅿🅿🅿🅿🅿
// 🅇🆇🅇🆇🅇🆇🅇🆇
// 🆇🅇🆇🅇🆇🅇🆇🅇
// 🅇🆇🅇🆇🅇🆇🅇🆇
// 🆇🅇🆇🅇🆇🅇🆇🅇
// 🄿🄿🄿🄿🄿🄿🄿🄿
// 🅁🄽‍🄱🅀🄺‍🄱🄽🅁
//❶➀

// const paintBoard = (board) => {
//   let s = "╔════════════════════╗ \n";
//   console.log({ board });
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       if (j === 0) {
//         s += "║";
//       }
//       if (board[i][j] === null) {
//         s += "𓐄𓐄▢";
//       } else {
//         let piece = board[i][j].type;
//         let color = board[i][j].color;
//         var symbol = paintPiece(piece, color);
//         s += `𓐄𓐄${symbol}`;
//       }

//       if (j === board[i].length - 1) {
//         s += `𓐄𓐄║${"87654321"[i]} \n`;
//       }
//     }
//   }
//   s += "╚════════════════════╝ \n";
//   s += "*a𓐄𓐄b𓐄𓐄c𓐄𓐄d𓐄𓐄e𓐄𓐄f𓐄𓐄g𓐄𓐄h \n";

//   return s;
// };

// ┌────────────────────┐
// │ April ▒▒▒▒▒▒▒ 2021 │
// ├──┬──┬──┬──┬──┬──┬──┤
// │Su│Mo│Tu│We│Th│Fr│Sa│
// ├──┼──┼──┼──┼──┼──┼──┤
// │▒▒│▒▒│▒▒│▒▒│01│02│03│
// ╔══╗──┼──┼──┼──┼──┼──┤
// ║04║05│06│07│08│09│10│
// ╚══╝──┼──┼──┼──┼──┼──┤
// │11│12│13│14│15│16│17│
// ├──┼──┼──┼──┼──┼──┼──┤
// │18│19│20│21│22│23│24│
// ├──┼──┼──┼──┼──┼──┼──┤
// │25│26│27│28│29│30│▒▒│
// └──┴──┴──┴──┴──┴──┴──┘

const paintBoard = (board) => {
  let s = "";
  console.log({ board });
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        const backgroundBlack = (i + j) % 2;
        s += paintSquare(!backgroundBlack);
      } else {
        let piece = board[i][j].type;
        let color = board[i][j].color;
        var symbol = paintPiece(piece, color);
        s += `${symbol}`;
      }
      if (j !== board[i].length - 1) {
        if (i === 0) {
          s += "┬";
        } else if (i === board.length - 1) {
          s += "┴";
        } else {
          s += "┼";
        }
      }

      if (j === board[i].length - 1) {
        s += `↤${"⑧⑦⑥⑤④③②①"[i]}\n`;
      }
    }
  }
  s += "ⓐ𐠊ⓑ𐠊ⓒ𐠊ⓓ𐠊ⓔ𐠊ⓕ𐠊ⓖ𐠊ⓗ\n";
  return s;
};

// const paintBoard = (board) => {
//   console.log({ board });
//   let s = "";
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       if (board[i][j] === null) {
//         s += "🅇";
//       } else {
//         let piece = board[i][j].type;
//         let color = board[i][j].color;
//         var symbol = paintPiece(piece, color);
//         s += `${symbol}`;
//       }

//       if (j === board[i].length - 1) {
//         s += `${"87654321"[i]}\n`;
//       }
//     }
//   }

//   return s;
// };

const chessGame = {
  game: "",
  turn: "",
  players: {},
  moves: [],
  set newGame(newGame) {
    // console.log({ newGame });
    this.game = newGame;
  },
  get gameInfo() {
    return this.game;
  },
  get playerTurn() {
    return this.turn;
  },
  get getHistoryMoves() {
    return this.moves;
  },
  bothPlayersJoined() {
    return Object.keys(this.players).length === 2;
  },
  isPlayerInGame(player) {
    console.log({ player });
    console.log({ players: this.players });
    return !!Object.keys(this.players).find((item) => item === player);
  },
  getPlayerTurn() {
    return Object.keys(this.players).find(
      (player) => this.players[player] === this.turn
    );
  },
  board(player) {
    if (!this.isPlayerInGame(player)) return;
    if (!this.bothPlayersJoined(player))
      return "Falta un jugador en la partida. Otro usuario debe usar el comando !play para participar.";
    return `Es turno de ${this.getPlayerTurn()}, con las fichas ${getTextPlayerColor(
      this.turn
    )}. Este es el estado actual del tablero:\n${paintBoard(
      this.game.board()
    )}`;
  },
  startGame(player, color) {
    console.log(player);
    if (this.game)
      return "Ya existe una partida. Usa !finishGame para borrar la partida creada";
    const newGame = new Chess();
    this.newGame = newGame;
    this.turn = newGame.turn();
    const playerColor = color === "b" ? "b" : "w";
    this.players[player] = playerColor;
    // console.log("board");
    // console.log(this.game.board());
    // console.log("paintboard");
    // console.log(paintBoard(this.game.board()));
    // console.log(this.game.ascii());
    return `Se ha creado una partida. Otro usuario debe escribir el comando !play para empezar a jugar contra ti.`;
  },
  finishGame(player) {
    if (!this.isPlayerInGame(player)) return;
    this.newGame = "";
    this.turn = "";
    this.moves = "";
    this.players = {};
    return "Se ha eliminado la partida. Para crear una partida nueva, usa el comando !chess";
  },
  gameOver() {
    if (!this.game.game_over()) return;
    const finishText = "El juego ha acabado.";
    if (this.game.in_checkmate())
      return `${finishText} Ha ganado el jugador ${this.getPlayerTurn()}.\n${paintBoard(
        this.game.board()
      )}`;
    if (this.game.in_stalemate())
      return `${finishText} Ha habido un ahogado, el jugador ${this.getPlayerTurn()} no puede hacer movimientos. Hay un empate.\n${paintBoard(
        this.game.board()
      )}`;
    if (this.game.in_draw())
      return `${finishText} Ha habido un empate, se ha superado el número máximo de turnos (50)\n${paintBoard(
        this.game.board()
      )}`;
  },
  addPlayer(player) {
    if (this.isPlayerInGame(player))
      return `El usuario ${player} ya pertenece a este juego. Su color es ${getTextPlayerColor(
        this.players[player]
      )}`;
    if (Object.keys(this.players).length > 1)
      return `El juego es de dos jugadores y ya está completo. Los jugadores son ${Object.keys(
        this.players
      ).join(" y ")}`;
    const firstPlayerColor = Object.values(this.players)[0];
    const newPlayerColor = firstPlayerColor === "w" ? "b" : "w";
    this.players[player] = newPlayerColor;
    return `El usuario ${player} ha sido añadido al juego. Su color es ${getTextPlayerColor(
      newPlayerColor
    )}. Consulta la leyenda con el comando !caption. Estado del tablero: \n ${paintBoard(
      this.game.board()
    )}`;
  },
  setPlayerMove(player, playerMove) {
    if (!this.isPlayerInGame(player)) return;
    if (!playerMove)
      return "Comando inválido, escribe !move [movimiento]. Consulta los movimientos posibles con !possibleMoves";
    if (this.players[player] === this.turn) {
      const move = this.game.move(playerMove);
      console.log({ move });
      if (move) {
        const history = {
          color: this.turn,
          date: new Date(),
          move: move,
        };
        this.moves.push(history);
        this.turn = this.game.turn();
        // console.log("movement", this.game.moves());
        const gameOverText = this.gameOver();
        if (!!gameOverText) return gameOverText;
        return `El usuario ${player} Ha hecho un movimiento. Consulta la leyenda con el comando !caption. Estado del tablero: \n${paintBoard(
          this.game.board()
        )}`;
      }
      return "Movimiento inválido. Consulta los movimientos posibles con !possibleMoves.";
    }
    return "No es tu turno. Usa este comando en tu turno para realizar un movimiento.";
  },
  getPossibleMoves(player) {
    console.log("isplayeringame", this.isPlayerInGame(player));
    if (!this.isPlayerInGame(player)) return;
    console.log("turn", this.turn);
    if (this.players[player] === this.turn) {
      return `Los movimientos posibles son: ${this.game
        .moves()
        .join(
          ", "
        )}. Para mover una ficha, recuerda escribir !move [movimiento]`;
    }
    console.log("turn: ", this.turn);
    return `No es tu turno, es turno de las fichas ${getTextPlayerColor(
      this.turn
    )}. Tus fichas son las ${getTextPlayerColor(this.players[player])}.`;
  },
  getCaption(player) {
    if (!this.isPlayerInGame(player)) return;
    return paintCaption();
  },
  getHelp(player) {
    if (!this.isPlayerInGame(player)) return;
    return paintCommandsHelp();
  },
  paintData() {
    return `players: ${JSON.stringify(this.players)}, turn: ${
      this.turn
    }, moves: ${JSON.stringify(this.moves)}`;
  },
};

// chessGame.startGame();
console.log({ chessGame });
// console.log(chessGame.board());
// chessGame.getTurn;
// // console.log("moves", chessGame.possibleMoves);
// chessGame.setPlayerMove("w", "e4");
// console.log(chessGame.board());

module.exports = chessGame;
