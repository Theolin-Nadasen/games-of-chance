import { Devvit, useInterval, useState } from "@devvit/public-api";

async function storeResult(context: Devvit.Context, username: string, result: string) {
    const timestamp = Date.now();  // Get the current timestamp
    await context.redis.hSet('game_results_1', { [username]: JSON.stringify({ result, timestamp }) });
}

function CoinFlip({onBackToMenu, context} : {onBackToMenu : () => void; context : Devvit.Context}){
    const [result, setResult] = useState("heads");
    const [isFlipping, setIsFlipping] = useState(false);
    const [shouldFlip, setShouldFlip] = useState(true);

    const coinImages : {[key : string] : string} = {
        heads : "heads.png",
        tails : "tails.png",
    };

    const LoadingScreenTime = useInterval(() => {
        if(shouldFlip){
            setIsFlipping(false);
            const randomResult = Math.random() < 0.5 ? 'heads' : 'tails';
            storeResult(context, context.userId || "someone", `flipped and got ${randomResult}`);
            setResult(randomResult);
            setShouldFlip(false); // stops the loading screen from showing
        }
        
    }, 1000);

    const flipCoin = () => {
        setIsFlipping(true);
        setShouldFlip(true); // sets whether the loading screen should show or not

        LoadingScreenTime.start();
    };

    return (
        <vstack alignment="center middle" backgroundColor="black" gap="medium" height={100}>

            {isFlipping ? (<text size="xxlarge" weight="bold">Flipping the coin...</text>) : (
                <>
                    <text size="xxlarge">Heads or Tails</text>

                    <image
                        url = {coinImages[result]}
                        description="coin"
                        imageHeight={100}
                        imageWidth={100}/>
                    
                    <text>{result}</text>
                    <button onPress={flipCoin}>Flip the coin</button>
                    <button onPress={onBackToMenu}>Back To Menu</button>
                </>
            )};

            

        </vstack>
    );
}

export default CoinFlip;