import { Devvit, useState } from '@devvit/public-api';

function TicTacToe({onBackToMenu } : {onBackToMenu: () => void}) {
  // State to track the board and current player
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const getRandomAvailableMove = (board: string[]): number => {
    const availableMoves = board
      .map((cell, index) => (cell === null ? index : null)) // Get indices of available cells
      .filter((index) => index !== null); // Remove null values
  
    if (availableMoves.length === 0) return -1; // No available moves
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex]!; // Return a random available move
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return; // Prevent overwriting cells or continuing after a win
  
    // Player's move
    const newBoard = [...board];
    newBoard[index] = 'X'; // Player uses the X symbol
    setBoard(newBoard);
  
    // Check if the game is over after the player's move
    if (!calculateWinner(newBoard)) {
      // Computer's move
      const computerMoveIndex = getRandomAvailableMove(newBoard);
      if (computerMoveIndex !== -1) {
        newBoard[computerMoveIndex] = 'O'; // Computer uses the O symbol
        setBoard(newBoard);
      }
    }
  
    // Toggle the turn only after the player's move
    setIsXNext(!isXNext);
  };

  // Function to calculate the winner
  const calculateWinner = (board: string[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Determine the game status
  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((cell) => cell)
    ? 'Draw!'
    : `You are X`;

  return (
    <vstack alignment="center middle" backgroundColor='black' gap="small" height={100}>
      <text size="xxlarge">Tic-Tac-Toe</text>
      <text size="xlarge">{status}</text>
      <hstack gap="medium">
        {[0, 1, 2].map((row) => (
          <vstack key={row} gap="medium">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <button
                  key={index}
                  onPress={() => handleClick(index)}
                  disabled={board[index] || winner}
                >
                  {board[index] || '-'}
                </button>
              );
            })}
          </vstack>
        ))}
      </hstack>
      <button onPress={() => setBoard(Array(9).fill(null))}>Reset Game</button>
      <button onPress={onBackToMenu}>Back To Menu</button>
    </vstack>
  );
}

export default TicTacToe;