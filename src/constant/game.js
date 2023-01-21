export const INIT_HISTORY = (row, col) => [
  {
    squares: Array.from({ length: row }, () =>
      Array.from({ length: col }, () => null)
    ),
  },
];

export const PLAYER_ONE_ICON = "X";
export const PLAYER_TWO_ICON = "O";
