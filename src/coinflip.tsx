import { Devvit, useInterval, useState } from "@devvit/public-api";

function CoinFlip({onBackToMenu} : {onBackToMenu : () => void}){
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
            setResult(randomResult);
            setShouldFlip(false); // stops the loading screen from showing
        }
        
    }, 2000);

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