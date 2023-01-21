import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Board } from "../";
import GameContext from "../../context";
const Game = observer(() => {
  const store = useContext(GameContext);

  const moves = store.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => store.jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={store.currentSquares}
          handlePlay={store.handlePlay}
          step={store.step}
          history={store.history}
          next={store.next}
          winner={store.winner}
        />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
});

export default Game;
