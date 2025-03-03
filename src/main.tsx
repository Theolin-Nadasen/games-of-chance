// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';
import GameMenu from './menu.js';
import TicTacToe from './tiktactoe.js';
import CoinFlip from './coinflip.js';
import Dice from './dice.js';
import Leaderboard from './Leaderboard.js';

Devvit.configure({
  redditAPI: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add Games of Chance Post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'Games of Chance',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'regular',
  render: (_context) => {const [counter, setCounter] = useState(0);
    const [currentGame, setGame] = useState("none");

    function handleSelectGame(game : string) {
      setGame(game);
    } 

    function handleBackToMenu(){
      setGame("none");
    }

    return (
      <vstack backgroundColor='black' height={100}>
        {currentGame === "none" && <GameMenu onSelectGame={handleSelectGame}/>}
        {currentGame === "tictactoe" && <TicTacToe onBackToMenu={handleBackToMenu}/>}
        {currentGame === "coinflip" && <CoinFlip onBackToMenu={handleBackToMenu} context={_context}/>}
        {currentGame === "dice" && <Dice onBackToMenu={handleBackToMenu} context={_context}/>}
        {currentGame === "Leaderboard" && <Leaderboard onBackToMenu={handleBackToMenu} context={_context}/>}
      </vstack>
    );
  },
});

export default Devvit;
