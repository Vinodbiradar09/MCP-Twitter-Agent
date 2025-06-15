import { config } from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';
config();

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,  // Fixed: added process.env
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,  // Fixed: added process.env
});

export async function createPost(status) {
    try {
        const newPost = await twitterClient.v2.tweet(status);
        
        return {
            content: [
                {
                    type: "text",
                    text: `Successfully tweeted: "${status}" - Tweet ID: ${newPost.data.id}`
                }
            ]
        };
    } catch (error) {
        console.error('Error creating tweet:', error);
        
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to create tweet: ${error.message}`
                }
            ]
        };
    }
}