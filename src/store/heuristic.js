import { PLAYER_MAX, PLAYER_MIN } from "../constant/game";

export default class CaroHeuristic {
  botWin = 0;
  playerWin = 0;
  botTwo = 0;
  playerTwo = 0;
  botThree = 0;
  playerThree = 0;
  WIN = 0;

  constructor(board, WIN = 3) {
    this.board = board;
    this.row = board.length;
    this.col = board[0].length;
    this.WIN = WIN;
  }

  calcRow() {
    for (let row = 0; row < this.row; row++) {
      let botCell = 0,
        playerCell = 0;
      for (let col = 0; col < this.col; col++) {
        if (this.isBot(row, col)) ++botCell;
        if (this.isPlayer(row, col)) ++playerCell;
        this.calcWin(botCell, playerCell);
      }
    }
  }

  calcCol() {
    for (let col = 0; col < this.col; col++) {
      let botCell = 0,
        playerCell = 0;
      for (let row = 0; row < this.row; row++) {
        if (this.isBot(row, col)) ++botCell;
        if (this.isPlayer(row, col)) ++playerCell;
        this.calcWin(botCell, playerCell);
      }
    }
  }

  calcDiag() {
    for (let row = 0; row <= this.row - this.WIN; row++) {
      for (let col = 0; col <= this.col - this.WIN; ++col) {
        let botCell = 0,
          playerCell = 0;
        for (let i = 0; i < this.WIN; ++i) {
          if (this.isBot(row + i, col + i)) ++botCell;
          if (this.isPlayer(row + i, col + i)) ++playerCell;
          this.calcWin(botCell, playerCell);
        }
      }
    }

    for (let row = 0; row + this.WIN - 1 < this.row; row++) {
      for (let col = this.col - 1; col - this.WIN + 1 >= 0; --col) {
        let botCell = 0,
          playerCell = 0;
        for (let i = 0; i < this.WIN; ++i) {
          if (this.isBot(row + i, col - i)) ++botCell;
          if (this.isPlayer(row + i, col - i)) ++playerCell;
          this.calcWin(botCell, playerCell);
        }
      }
    }
  }

  isPlayer(row, col) {
    return this.board[row][col] === PLAYER_MAX;
  }
  isBot(row, col) {
    return this.board[row][col] === PLAYER_MIN;
  }
  calcWin(botCell, playerCell) {
    if (botCell === this.WIN) ++this.botWin;
    if (playerCell === this.WIN) ++this.playerWin;
  }
}
