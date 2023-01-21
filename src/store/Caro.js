import { makeAutoObservable } from "mobx";
import {
  INIT_HISTORY,
  PLAYER_ONE_ICON,
  PLAYER_TWO_ICON,
} from "../constant/game";
import { calculateWinner } from "../helper";
import minimax from "./Bot";

class Caro {
  constructor(row, col, history) {
    this.row = row;
    this.col = col;
    this.history = history;
    this.step = history.length;
    this.handlePlay = this.handlePlay.bind(this);
    makeAutoObservable(this);
  }

  get currentSquares() {
    return this.history[this.step - 1].squares;
  }

  get winner() {
    return calculateWinner(this.currentSquares);
  }

  get next() {
    return this.step % 2 ? PLAYER_ONE_ICON : PLAYER_TWO_ICON;
  }

  /**
   * @param {number} currentStep
   */
  jumpTo(currentStep) {
    this.step = currentStep + 1;
  }

  /**
   * @param {string | number} i
   */
  handlePlay(i, j, isBot = true) {
    if (this.winner) return;

    const currentHistory = this.history.slice(0, this.step);
    const newSquares = JSON.parse(JSON.stringify(this.currentSquares));
    newSquares[i][j] = this.next;
    currentHistory.push({
      squares: newSquares,
    });
    this.history = currentHistory;
    this.step = currentHistory.length;
    localStorage.setItem("HISTORY", JSON.stringify(this.history));
    if (isBot) {
      let x = minimax(newSquares, PLAYER_TWO_ICON, 5, { row: i, col: j });
      console.log(x);
      if (x.bestMove.row != -1 && x.bestMove.col != -1)
        this.handlePlay(x.bestMove.row, x.bestMove.col, false);
    }
  }
}

const store = new Caro(
  5,
  5,
  JSON.parse(localStorage.getItem("HISTORY")) || INIT_HISTORY(5, 5)
);

export default store;
