export const INIT_HISTORY = (row, col) => [
  {
    squares: Array.from({ length: row }, () =>
      Array.from({ length: col }, () => null)
    ),
  },
];

export const PLAYER_MAX = "X";
export const PLAYER_MIN = "O";
