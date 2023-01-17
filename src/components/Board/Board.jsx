import React from "react";
import { Square } from "../";

const Board = ({ squares, handlePlay, next, winner }) => {
  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          handlePlay(i);
        }}
        isOdd={!!(i % 2)}
      />
    );
  }

  const renderStatus = () => {
    if (winner) return `Winner: ${winner}`;
    return `Next player: ${next}`;
  };

  return (
    <div>
      <div className="status">{renderStatus()}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
