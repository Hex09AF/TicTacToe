import { PLAYER_ONE_ICON, PLAYER_TWO_ICON } from "../constant/game";

function heuristic(board, player) {
  let botWinningLines = 0;
  let opponentWinningLines = 0;
  let botTwoInARow = 0;
  let opponentTwoInARow = 0;
  let botThreeInARow = 0;
  let opponentThreeInARow = 0;

  // Check rows
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length - 4; col++) {
      let subRow = board[row].slice(col, col + 5);
      if (subRow.every((cell) => cell === player)) {
        botWinningLines++;
      }
      if (subRow.every((cell) => cell === opponent(player))) {
        opponentWinningLines++;
      }
      if (subRow.filter((cell) => cell === player).length === 3) {
        botThreeInARow++;
      }
      if (subRow.filter((cell) => cell === opponent(player)).length === 3) {
        opponentThreeInARow++;
      }
      if (subRow.filter((cell) => cell === player).length === 2) {
        botTwoInARow++;
      }
      if (subRow.filter((cell) => cell === opponent(player)).length === 2) {
        opponentTwoInARow++;
      }
    }
  }

  // Check columns
  for (let col = 0; col < board[0].length; col++) {
    for (let row = 0; row < board.length - 4; row++) {
      let subCol = [
        board[row][col],
        board[row + 1][col],
        board[row + 2][col],
        board[row + 3][col],
        board[row + 4][col],
      ];
      if (subCol.every((cell) => cell === player)) {
        botWinningLines++;
      }
      if (subCol.every((cell) => cell === opponent(player))) {
        opponentWinningLines++;
      }
      if (subCol.filter((cell) => cell === player).length === 3) {
        botThreeInARow++;
      }
      if (subCol.filter((cell) => cell === opponent(player)).length === 3) {
        opponentThreeInARow++;
      }
      if (subCol.filter((cell) => cell === player).length === 2) {
        botTwoInARow++;
      }
      if (subCol.filter((cell) => cell === opponent(player)).length === 2) {
        opponentTwoInARow++;
      }
    }
  }

  for (let row = 0; row < board.length - 4; row++) {
    for (let col = 0; col < board[row].length - 4; col++) {
      let subDiag = [
        board[row][col],
        board[row + 1][col + 1],
        board[row + 2][col + 2],
        board[row + 3][col + 3],
        board[row + 4][col + 4],
      ];
      if (subDiag.every((cell) => cell === player)) {
        botWinningLines++;
      }
      if (subDiag.every((cell) => cell === opponent(player))) {
        opponentWinningLines++;
      }
      if (subDiag.filter((cell) => cell === player).length === 3) {
        botThreeInARow++;
      }
      if (subDiag.filter((cell) => cell === opponent(player)).length === 3) {
        opponentThreeInARow++;
      }
      if (subDiag.filter((cell) => cell === player).length === 2) {
        botTwoInARow++;
      }
      if (subDiag.filter((cell) => cell === opponent(player)).length === 2) {
        opponentTwoInARow++;
      }
    }
  }

  for (let row = 0; row < board.length - 4; row++) {
    for (let col = 4; col < board[row].length; col++) {
      let subDiag = [
        board[row][col],
        board[row + 1][col - 1],
        board[row + 2][col - 2],
        board[row + 3][col - 3],
        board[row + 4][col - 4],
      ];
      if (subDiag.every((cell) => cell === player)) {
        botWinningLines++;
      }
      if (subDiag.every((cell) => cell === opponent(player))) {
        opponentWinningLines++;
      }
      if (subDiag.filter((cell) => cell === player).length === 3) {
        botThreeInARow++;
      }
      if (subDiag.filter((cell) => cell === opponent(player)).length === 3) {
        opponentThreeInARow++;
      }
      if (subDiag.filter((cell) => cell === player).length === 2) {
        botTwoInARow++;
      }
      if (subDiag.filter((cell) => cell === opponent(player)).length === 2) {
        opponentTwoInARow++;
      }
    }
  }
  let botScore =
    botWinningLines * 1000 + botThreeInARow * 100 + botTwoInARow * 10;
  let opponentScore =
    opponentWinningLines * 2000 +
    opponentThreeInARow * 200 +
    opponentTwoInARow * 20;
  return botScore - opponentScore * 0;
}

function opponent(player) {
  return player === PLAYER_ONE_ICON ? PLAYER_TWO_ICON : PLAYER_ONE_ICON;
}

export default function minimax(board, player, depth, lastMove) {
  if (depth === 0) {
    return { bestMove: lastMove, bestVal: heuristic(board, player) };
  }

  let bestVal = player === PLAYER_ONE_ICON ? Infinity : -Infinity;
  let bestMove = { row: -1, col: -1 };

  let validMoves = getValidMoves(board, lastMove);
  for (let i = 0; i < validMoves.length; ++i) {
    let { row, col } = validMoves[i];
    if (!board[row][col]) {
      board[row][col] = player;
      let val = minimax(
        board,
        player === PLAYER_ONE_ICON ? PLAYER_TWO_ICON : PLAYER_ONE_ICON,
        depth - 1,
        { row, col }
      );
      board[row][col] = "";
      if (player === PLAYER_ONE_ICON && val.bestVal < bestVal) {
        bestVal = val.bestVal;
        bestMove.row = row;
        bestMove.col = col;
      } else if (player === PLAYER_TWO_ICON && val.bestVal > bestVal) {
        bestVal = val.bestVal;
        bestMove.row = row;
        bestMove.col = col;
      }
    }
  }

  return { bestMove, bestVal: bestVal - (5 - depth) * 100 };
}

function getValidMoves(board, move) {
  let validMoves = [];
  for (let i = -1; i <= 1; ++i) {
    for (let j = -1; j <= 1; ++j) {
      let row = move.row + i;
      let col = move.col + j;
      if (row >= 0 && row < board.length && col >= 0 && col < board[0].length) {
        if (!board[row][col]) {
          validMoves.push({ row, col });
        }
      }
    }
  }
  return validMoves;
}
