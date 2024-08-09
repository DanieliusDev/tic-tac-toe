const EMPTY_BOARD: Board = Array(9).fill(null);
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export class Game {
  board = $state(structuredClone(EMPTY_BOARD));
  turn: "X" | "O" = $state("X");
  scores = $state({ X: 0, O: 0, tie: 0 });

  winningLine = $derived.by(() => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return [a, b, c];
      }
    }
    return null;
  });
  winner = $derived.by(() => {
    if (this.winningLine) return this.turn;
    if (this.board.every((square) => square !== null)) return "tie" as const;
    return null;
  });

  constructor() {
    $effect(() => {
      if (this.winner) this.scores[this.winner] += 1;
    });
  }

  inset(position: number) {
    if (this.winner) return this.reset();
    if (this.board[position] !== null) return;

    this.board[position] = this.turn;
    if (!this.winner) this.turn = this.turn === "X" ? "O" : "X";
  }

  reset() {
    this.board = structuredClone(EMPTY_BOARD);
    this.turn = this.turn === "X" ? "O" : "X";
  }
}

type Board = ("X" | "O" | null)[];
