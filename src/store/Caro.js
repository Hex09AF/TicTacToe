import { makeAutoObservable } from "mobx";
import { INIT_HISTORY, PLAYER_MIN, PLAYER_MAX } from "../constant/game";
import { calculateWinner } from "../helper";
import { findBest } from "./Bot";

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
    return this.step % 2 ? PLAYER_MAX : PLAYER_MIN;
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
      let x = findBest(newSquares, PLAYER_MIN, 8, { row: i, col: j });
      console.log(x);
      if (x.row !== -1 && x.col !== -1) this.handlePlay(x.row, x.col, false);
    }
  }
}

const store = new Caro(
  3,
  3,
  JSON.parse(localStorage.getItem("HISTORY")) || INIT_HISTORY(3, 3)
);

export default store;
