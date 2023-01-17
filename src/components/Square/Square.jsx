import React from "react";

// props => obj
// value, isOdd => props.value, props.isOdd
// {value, isOdd}

const Square = ({ value, isOdd, onClick }) => {
  return (
    <button className={`square ${isOdd}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
