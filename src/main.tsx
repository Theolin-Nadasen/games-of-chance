// Learn more at developers.reddit.com/docs
import { Comment, Devvit, Listing, Post, Subreddit, useState } from '@devvit/public-api';
import GameMenu from './menu.js';
import TicTacToe from './tiktactoe.js';
import CoinFlip from './coinflip.js';
import Dice from './dice.js';
import Leaderboard from './leaderboard.js';

Devvit.configure({
  redditAPI: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add Games of Chance Post',
  location: 'subreddit',
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

//my scheduller for creating comments
Devvit.addSchedulerJob({
  name: 'AddComment',
  onRun: async (event, context) => {
    const subreddit = await context.reddit.getCurrentSubreddit();

    // checks the latest post for the words "game" or "play" and leaves a comment instructing them on how to start the app
    for (const post of await context.reddit.getNewPosts({ subredditName: subreddit.name, limit: 1, pageSize : 100 }).all()) {
      if (post.title.includes('game') || post.title.includes("play") || post.body?.includes("game") || post.body.includes("play")) {
        await post.addComment({ text : `u/${post.authorName} you can play games by clicking the 3 dots at the top of the sub and selecting 'Add Games Of Chance Post'`});
      }
    }
  }
});

//my triegger for when someone makes a new post
Devvit.addTrigger({
  event: 'PostSubmit',
  async onEvent(event, context) {

    const Job = await context.scheduler.runJob({
      name : "AddComment",
      runAt : new Date(Date.now() + 5000) // runs after 5 seconds 
    })

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
        {currentGame === "none" && <GameMenu onSelectGame={handleSelectGame} context={_context}/>}
        {currentGame === "tictactoe" && <TicTacToe onBackToMenu={handleBackToMenu}/>}
        {currentGame === "coinflip" && <CoinFlip onBackToMenu={handleBackToMenu} context={_context}/>}
        {currentGame === "dice" && <Dice onBackToMenu={handleBackToMenu} context={_context}/>}
        {currentGame === "Leaderboard" && <Leaderboard onBackToMenu={handleBackToMenu} context={_context}/>}
      </vstack>
    );
  },
});

export default Devvit;
