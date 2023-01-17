import React from "react";
import { Board } from "../";
import { useGame } from "../../hooks";

const Game = () => {
  const { history, step, jumpTo, handlePlay, next, winner, currentSquares } =
    useGame();

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          handlePlay={handlePlay}
          step={step}
          history={history}
          {...{ handlePlay, next, winner }}
        />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
