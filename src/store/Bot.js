import { PLAYER_MIN, PLAYER_MAX } from "../constant/game";
import CaroHeuristic from "./heuristic";

function heuristic(board) {
  let caroHeur = new CaroHeuristic(board, 3);
  caroHeur.calcCol();
  caroHeur.calcRow();
  caroHeur.calcDiag();
  if (caroHeur.playerWin) return 10;
  if (caroHeur.botWin) return -10;
  return 0;
}

function getValidMoves(board, move) {
  let validMoves = [];
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (!board[i][j]) validMoves.push({ row: i, col: j });
    }
  }
  return validMoves;
}

function minimax(board, depth, player) {
  let score = heuristic(board);
  if (score === 10) return score;
  if (score === -10) return score;
  let validMoves = getValidMoves(board);
  if (validMoves.length === 0) return 0;
  // If this maximizer's move
  if (player === PLAYER_MAX) {
    let best = -1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = player;
          best = Math.max(best, minimax(board, depth + 1, opponent(player)));
          board[i][j] = null;
        }
      }
    }
    return best;
  }
  // If this minimizer's move
  else {
    let best = 1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = player;
          best = Math.min(best, minimax(board, depth + 1, opponent(player)));
          board[i][j] = null;
        }
      }
    }
    return best;
  }
}

function opponent(player) {
  return player === PLAYER_MAX ? PLAYER_MIN : PLAYER_MAX;
}

export function findBest(board, player) {
  let bestVal = 1000;
  let bestMove = { row: -1, col: -1 };

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = player;
        let moveVal = minimax(board, 0, opponent(player));
        board[i][j] = null;
        if (moveVal < bestVal) {
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }
    }
  }
  return bestMove;
}
