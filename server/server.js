import { TwitterApi } from "twitter-api-v2";
import "dotenv/config";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// use cors on our express instance to allow for data fetching from client-side
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// create a main Twitter client with our Bearer Token
const clientMain = new TwitterApi(process.env.BEARER_TOKEN);

const numberOfTweetsToFetch = 10;
const usernameQuery = "tim_cook";

// set this client to read-only since we are only pulling information from the API
const roClient = clientMain.readOnly;

// identify a user to pull data from (me)
const user = await roClient.v2.usersByUsernames(usernameQuery);
const myTwitterId = user?.data[0]?.id;
// console.log(myTwitterId);

// GET user information. Returns Profile Image, Username, Display Name, and ID
const myUserProfileData = await roClient.v2.users(myTwitterId, {
    "user.fields": ["profile_image_url", "verified"]
});
// console.log(myUserProfileData);

const myUserAvatarLink = myUserProfileData?.data[0]?.profile_image_url;
// console.log(myUserAvatarLink);

// GET user Timeline - set maximum results to 5 tweets, with expansions of media information and referenced tweets.
const myTimeline = await roClient.v2.userTimeline(myTwitterId, {
    max_results: numberOfTweetsToFetch,
    expansions: [
        "attachments.media_keys",
        "attachments.poll_ids",
        "referenced_tweets.id",
    ],
    "tweet.fields": ["public_metrics", "created_at"],
    "media.fields": ["url", "preview_image_url"],
});

// myTimeline.includes contains a TwitterV2IncludesHelper instance
// how can i change this to display only 5 tweets?

// console.log("logging data: ", myTimeline.data);
let i = 0;
let myTimelineTweetData = []
for await (const tweet of myTimeline) {
    // myTimelineTweetData = [ ...myTimelineTweetData, tweet ];
    const medias = myTimeline.includes.medias(tweet);
    myTimelineTweetData = [ ...myTimelineTweetData, {
        'tweet': tweet,
        'media': medias
    } ];
    // returns 5 tweet objects from reverse chron order.
    // if the tweets include a referenced tweet (e.g. a retweet)
    // i need to somehow indicate that those tweets were retweeted.
    // if tweet.referenced_tweets != null {include logo rendering} (from the client side, at least)

    console.log(myTimelineTweetData);
    i++;
    if (i === numberOfTweetsToFetch) {
        // console.log("the tweet array", myTimelineTweetData);
        break;
    }
}

const myTimelineTweetDataObject = {
    tweetsDataArray: myTimelineTweetData,
    myUserProfileData: myUserProfileData
}

app.get('/tweets', (_, res) => {
    res.json({ ok: true, myTimelineTweetDataObject})
})

console.log('the tweet object', myTimelineTweetDataObject);

//   for await (const tweet of myTimeline) {
//     console.log("the tweet: ", tweet);
//     const medias = myTimeline.includes.medias(tweet);
//     const poll = myTimeline.includes.poll(tweet);

//     if (medias.length) {
//       console.log('This tweet contains medias! URLs:', medias.map(m => m.url));
//     }
//     if (poll) {
//       console.log('This tweet contains a poll! Options:', poll.options.map(opt => opt.label));
//     }
//   }
