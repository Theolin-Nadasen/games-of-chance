import { Devvit, useState } from "@devvit/public-api";

function Dice({onBackToMenu} : {onBackToMenu : () => void}) {
    const [result1, setResult1] = useState(1)
    const [result2, setResult2] = useState(1)

    const diceImages : {[key : number] : string} = {
        1 : "one.png",
        2 : "two.png",
        3 : "three.png",
        4 : "four.png",
        5 : "five.png",
        6 : "six.png",
    }

    const rollDice = () => {
        setResult1(Math.floor(Math.random() * 6) + 1);
        setResult2(Math.floor(Math.random() * 6) + 1);

    }

    return (
        <vstack height={100} backgroundColor="black" gap="medium" alignment="center middle">
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
        </vstack>
    )
}

export default Dice;