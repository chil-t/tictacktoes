import { useSignal } from "@preact/signals";

export default function TicTacToe() {
  // Game state
  const board = useSignal<(string | null)[]>(Array(9).fill(null));
  const currentPlayer = useSignal<"X" | "O">("X");
  const winner = useSignal<string | null>(null);
  const isDraw = useSignal<boolean>(false);
  
  // Handle a square click
  const handleClick = (index: number) => {
    // If square is already filled or game is over, do nothing
    if (board.value[index] || winner.value || isDraw.value) {
      return;
    }
    
    // Create a new board array with the move
    const newBoard = [...board.value];
    newBoard[index] = currentPlayer.value;
    board.value = newBoard;
    
    // Check for winner
    checkWinner();
    
    // Switch player if game isn't over
    if (!winner.value && !isDraw.value) {
      currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
    }
  };
  
  // Check for a winner or draw
  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Check for winner
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board.value[a] &&
        board.value[a] === board.value[b] &&
        board.value[a] === board.value[c]
      ) {
        winner.value = board.value[a];
        return;
      }
    }
    
    // Check for draw
    if (!board.value.includes(null)) {
      isDraw.value = true;
    }
  };
  
  // Reset the game
  const resetGame = () => {
    board.value = Array(9).fill(null);
    currentPlayer.value = "X";
    winner.value = null;
    isDraw.value = false;
  };
  
  return (
    <div class="flex flex-col items-center">
      <h1 class="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      
      {/* Game status */}
      <div class="mb-6 text-2xl">
        {winner.value ? (
          <p>Winner: <span class="font-bold">{winner.value}</span>!</p>
        ) : isDraw.value ? (
          <p>It's a draw!</p>
        ) : (
          <p>Current player: <span class="font-bold">{currentPlayer}</span></p>
        )}
      </div>
      
      {/* Game board */}
      <div class="grid grid-cols-3 gap-2 mb-8">
        {board.value.map((square, index) => (
          <button
            key={index}
            type="button"
            class="w-24 h-24 bg-white border-2 border-gray-300 text-5xl font-bold flex items-center justify-center focus:outline-none hover:bg-gray-100"
            onClick={() => handleClick(index)}
            disabled={!!square || !!winner.value || isDraw.value}
          >
            {square}
          </button>
        ))}
      </div>
      
      {/* Reset button */}
      <button
        type="button"
        class="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}
