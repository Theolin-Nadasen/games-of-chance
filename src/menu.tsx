import { Devvit, useState } from "@devvit/public-api";

function GameMenu({onSelectGame, context} : {onSelectGame : (game: string) => void; context : Devvit.Context}) {
    return (
        <vstack height={100} backgroundColor="black" alignment="center middle" gap="medium">
          <text>hi! user : {context.userId || "not logged in"}</text>
          <text size="xxlarge" color="white" weight="bold">Game Menu</text>
          <button onPress={() => onSelectGame('tictactoe')}>Tic-Tac-Toe</button>
          <button onPress={() => onSelectGame('coinflip')}>Heads or Tails</button>
          <button onPress={() => onSelectGame('dice')}>Dice</button>
          <button onPress={() => onSelectGame('Leaderboard')}>Results History</button>

        </vstack>
      );
}

export default GameMenu;