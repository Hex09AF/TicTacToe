import { observer } from "mobx-react-lite";
import React from "react";
import { Square } from "../";

const Board = observer(({ squares, handlePlay, next, winner }) => {
  const renderStatus = () => {
    if (winner) return `Winner: ${winner}`;
    return `Next player: ${next}`;
  };

  return (
    <div>
      <div className="status">{renderStatus()}</div>
      {squares.map((row, i) => {
        return (
          <div key={i} className="board-row">
            {row.map((cell, j) => (
              <Square
                key={`${i}${j}`}
                value={cell}
                onClick={() => {
                  handlePlay(i, j);
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
});

export default Board;
