import { Devvit, useState } from "@devvit/public-api";

function GameMenu({onSelectGame} : {onSelectGame : (game: string) => void}) {
    return (
        <vstack height={100} backgroundColor="black" alignment="center middle" gap="medium">
          <text size="xxlarge" color="white" weight="bold">Game Menu</text>
          <button onPress={() => onSelectGame('tictactoe')}>Tic-Tac-Toe</button>
          <button onPress={() => onSelectGame('coinflip')}>Heads or Tails</button>
          <button onPress={() => onSelectGame('dice')}>Dice</button>

        </vstack>
      );
}

export default GameMenu;