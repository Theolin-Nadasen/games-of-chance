import { Devvit, useInterval, useState } from "@devvit/public-api";

async function storeResult(context: Devvit.Context, username: string, result: string) {
    const timestamp = Date.now();  // Get the current timestamp
    await context.redis.hSet('game_results_1', { [username]: JSON.stringify({ result, timestamp }) });
}

function Dice({onBackToMenu, context} : {onBackToMenu : () => void; context : Devvit.Context}) {
    const [result1, setResult1] = useState(1)
    const [result2, setResult2] = useState(1)

    const [isRolling, setIsRolling] = useState(false)
    const [canRoll, setCanRoll] = useState(true)

    const diceImages : {[key : number] : string} = {
        1 : "one.png",
        2 : "two.png",
        3 : "three.png",
        4 : "four.png",
        5 : "five.png",
        6 : "six.png",
    }

    const LoadingScreenTime = useInterval(() => {
        if (canRoll){
            setIsRolling(false);
            const firstResult =  Math.floor(Math.random() * 6) + 1
            setResult1(firstResult);
            const secondResult =  Math.floor(Math.random() * 6) + 1
            setResult2(secondResult);
            storeResult(context, context.userId || "someone", `rolled a ${firstResult} and a ${secondResult}`);
            setCanRoll(false); // stops the loading screen
        }
    }, 1000)

    const rollDice = () => {
        setIsRolling(true);
        setCanRoll(true); // allows the loading screen to run

        LoadingScreenTime.start();

    }

    return (
        <vstack height={100} backgroundColor="black" gap="medium" alignment="center middle">
            {isRolling ? (<text size="xxlarge" weight="bold">Rolling the dice...</text>) :
            (<>
            <text size="xxlarge" weight="bold">Dice</text>
            <hstack>
                <image
                    url={diceImages[result1]}
                    description="first dice"
                    imageHeight={100}
                    imageWidth={100}/>

                <image
                    url={diceImages[result2]}
                    description="second dice"
                    imageHeight={100}
                    imageWidth={100}/>

            </hstack>

            <text>you rolled a {result1} and a {result2}</text>

            <button onPress={rollDice}>Roll</button>
            <button onPress={onBackToMenu}>Back To Menu</button>
            </>)}
        </vstack>
    )
}

export default Dice;