const { Chess } = require("chess.js");

const getTextPlayerColor = (playerColor) => {
  if (playerColor === "w") return "blancas";
  if (playerColor === "b") return "negras";
};

const pieceDictionary = {
  pawnWhite: "Ⓟ",
  pawnBlack: "🅟",
  rookWhite: "Ⓡ",
  rookBlack: "🅡",
  knightWhite: "Ⓝ",
  knightBlack: "🅝",
  bishopWhite: "Ⓑ",
  bishopBlack: "🅑",
  queenWhite: "Ⓠ",
  queenBlack: "🅠",
  kingWhite: "Ⓚ",
  kingBlack: "🅚",
  // Squares
  squareWhite: "⓪",
  squareBlack: "⓿",
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
      return isWhite ? pieceDictionary.rookWhite : pieceDictionary.rookBlack;
    case "n":
      return isWhite
        ? pieceDictionary.knightWhite
        : pieceDictionary.knightBlack;
    case "b":
      return isWhite
        ? pieceDictionary.bishopWhite
        : pieceDictionary.bishopBlack;
    case "q":
      return isWhite ? pieceDictionary.queenWhite : pieceDictionary.queenBlack;
    case "k":
      return isWhite ? pieceDictionary.kingWhite : pieceDictionary.kingBlack;
    case "p":
      return isWhite ? pieceDictionary.pawnWhite : pieceDictionary.pawnBlack;
  }
};

const paintSquare = (backgroundWhite) => {
  return backgroundWhite
    ? pieceDictionary.squareWhite
    : pieceDictionary.squareBlack;
};

const paintCaption = () => {
  return `Leyenda: \n${pieceDictionary.pawnWhite} ➝ Peón blancas, ${pieceDictionary.rookWhite} ➝ Torre blancas, ${pieceDictionary.knightWhite} ➝ Caballo blancas, ${pieceDictionary.bishopWhite} ➝ Alfil blancas, ${pieceDictionary.queenWhite} ➝ Reina blancas, ${pieceDictionary.kingWhite} ➝ Rey blancas, ${pieceDictionary.pawnBlack} ➝ Peón negras, ${pieceDictionary.rookBlack} ➝ Torre negras, ${pieceDictionary.knightBlack} ➝ Caballo negras, ${pieceDictionary.bishopBlack} ➝ Alfil negras, ${pieceDictionary.queenBlack} ➝ Reina negras, ${pieceDictionary.kingBlack} ➝ Rey negras, ${pieceDictionary.squareWhite} ➝ Casilla vacía de fondo blanco, ${pieceDictionary.squareBlack} ➝ Casilla vacía de fondo negro`;
};

const paintCommandsHelp = () => {
  return "Comandos: \n!chess ➝ Crear la partida, !play ➝ Participar como segundo jugador, !finishGame ➝ Borrar la partida actual, !move [movimiento] ➝ Mover ficha si es su turno (método algebraico), !possibleMoves ➝ Ver los movimientos posibles si es su turno, !board ➝ Ver el estado del tablero y de quien es el turno, !caption ➝ Consultar leyenda. Si un usuario no participa en el juego, se ignoararán para él la mayor parte de los comandos.";
};

// 🆁🅽🅱🆀🅺🅱🅽🆁
// 🅿🅿🅿🅿🅿🅿🅿🅿
// 🅇🆇🅇🆇🅇🆇🅇🆇
// 🆇🅇🆇🅇🆇🅇🆇🅇
// 🅇🆇🅇🆇🅇🆇🅇🆇
// 🆇🅇🆇🅇🆇🅇🆇🅇
// 🄿🄿🄿🄿🄿🄿🄿🄿
// 🅁🄽‍🄱🅀🄺‍🄱🄽🅁

const paintBoard = (board) => {
  let s = "===================================\n";
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
  s += "ⓐ┴ⓑ┴ⓒ┴ⓓ┴ⓔ┴ⓕ┴ⓖ┴ⓗ\n";
  s += "===================================\n";
  return s;
};

const chessGame = {
  game: "",
  turn: "",
  players: {},
  moves: [],
  set newGame(newGame) {
    this.game = newGame;
  },
  bothPlayersJoined() {
    return Object.keys(this.players).length === 2;
  },
  isPlayerInGame(player) {
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
    const gameOverText = this.gameOver();
    if (!!gameOverText) return gameOverText;
    return `Es turno de ${this.getPlayerTurn()}, con las fichas ${getTextPlayerColor(
      this.turn
    )}. Estado del tablero:\n${paintBoard(this.game.board())}`;
  },
  startGame(player, color) {
    if (this.game)
      return "Ya existe una partida. Usa !finishGame para borrar la partida creada";
    const newGame = new Chess();
    this.newGame = newGame;
    this.turn = newGame.turn();
    const playerColor = color === "b" ? "b" : "w";
    this.players[player] = playerColor;
    return `Se ha creado una partida. Otro usuario debe escribir el comando !play para empezar a jugar contra ti.`;
  },
  finishGame(player) {
    if (!this.isPlayerInGame(player)) return;
    this.newGame = "";
    this.turn = "";
    this.moves = [];
    this.players = {};
    return "Se ha eliminado la partida. Para crear una partida nueva, usa el comando !chess";
  },
  gameOver() {
    if (!this.game.game_over()) return;
    const finishText = "El juego ha acabado.";
    if (this.game.in_checkmate())
      return `${finishText} ¡Jaque mate! Ha ganado el jugador ${this.getPlayerTurn()}. Usa !finishGame para borrar.\n${paintBoard(
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
    )}. Consulta la leyenda con el comando !caption. El estado del tablero es: \n ${paintBoard(
      this.game.board()
    )}`;
  },
  setPlayerMove(player, playerMove) {
    if (!this.isPlayerInGame(player)) return;
    if (!playerMove)
      return "Comando inválido, escribe !move [movimiento]. Consulta los movimientos posibles con !possibleMoves";
    if (this.players[player] === this.turn) {
      const move = this.game.move(playerMove);
      if (move) {
        const history = {
          color: this.turn,
          date: new Date(),
          move: move,
        };
        this.moves.push(history);
        const gameOverText = this.gameOver();
        if (!!gameOverText) return gameOverText;
        this.turn = this.game.turn();
        return `El usuario ${player} Ha hecho un movimiento. Consulta la leyenda con el comando !caption. El estado del tablero es: \n${paintBoard(
          this.game.board()
        )}`;
      }
      return "Movimiento inválido. Consulta los movimientos posibles con !possibleMoves.";
    }
    return "No es tu turno. Usa este comando en tu turno para realizar un movimiento.";
  },
  getPossibleMoves(player) {
    if (!this.isPlayerInGame(player)) return;
    if (this.players[player] === this.turn) {
      return `Los movimientos posibles son: ${this.game
        .moves()
        .join(
          ", "
        )}. Para mover una ficha, recuerda escribir !move [movimiento]`;
    }
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

console.log({ chessGame });

module.exports = chessGame;
