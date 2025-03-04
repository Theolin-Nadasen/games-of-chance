import { Devvit, useState } from "@devvit/public-api";

async function storeResult(context: Devvit.Context, username: string, result: string) {
    const timestamp = Date.now();  // Get the current timestamp
    await context.redis.hSet('game_results_1', { [username]: JSON.stringify({ result, timestamp }) });
}

async function getAllResults(context: Devvit.Context) {
    // Retrieve all results
    return await context.redis.hGetAll('game_results_1');
}

function Leaderboard({ onBackToMenu, context }: { onBackToMenu: () => void, context: Devvit.Context }) {
    const [results, setResults] = useState<Record<string, string>>({});  // Store the results in state

    const fetchResults = async () => {
        const allResults = await getAllResults(context);

        // Sort results by timestamp in descending order (most recent first)
        const sortedResults = Object.entries(allResults)
            .map(([username, data]) => {
                const { result, timestamp } = JSON.parse(data);  // Parse the stored JSON
                return { username, result, timestamp };
            })
            .sort((a, b) => b.timestamp - a.timestamp);  // Sort by timestamp (descending)

        // Convert the array back to an object for state
        const resultsObj = sortedResults.reduce((acc, { username, result }) => {
            acc[username] = result;
            return acc;
        }, {} as Record<string, string>);

        setResults(resultsObj);  
    };


    const topResults = Object.entries(results).slice(0, 5);  // Limit to 5 most recent results

    return (
        <vstack gap="medium" height={100} backgroundColor="black" alignment="center middle">
            <button onPress={fetchResults}>Load Latest Results</button>

            
            {topResults.length > 0 ? (
                topResults.map(([username, result]) => (
                    <text key={username}>
                        {username}: {result}
                    </text>
                ))
            ) : (
                <text>No results loaded</text>
            )}

            <button onPress={onBackToMenu}>Back To Menu</button>
        </vstack>
    );
}

export default Leaderboard;
