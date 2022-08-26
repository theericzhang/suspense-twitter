import { TwitterApi } from "twitter-api-v2";
import "dotenv/config";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const clientMain = new TwitterApi(process.env.BEARER_TOKEN);

// const clientMain = new TwitterApi(
//     {
//         clientId : process.env.CLIENT_ID,
//         clientSecret : process.env.CLIENT_SECRET
//     }
// )
const roClient = clientMain.readOnly;

// const myTimeline = await roClient.v1.homeTimeline();
// console.log(myTimeline.tweets.length, 'fetched.');

const user = await roClient.v2.usersByUsernames("anericzhang");
// console.log("success", user);

const myTwitterId = user?.data[0]?.id;
console.log(myTwitterId);

// const myTimeline = await roClient.v2.homeTimeline(myTwitterId)

const myTimeline = await roClient.v2.userTimeline(myTwitterId, {
    max_results: 5,
    expansions: [
        "attachments.media_keys",
        "attachments.poll_ids",
        "referenced_tweets.id",
    ],
    "media.fields": ["url"],
});

// myTimeline.includes contains a TwitterV2IncludesHelper instance
// how can i change this to display only 5 tweets?

// console.log("logging data: ", myTimeline.data);
let i = 0;
let myTimelineTweetData = []
for await (const tweet of myTimeline) {
    myTimelineTweetData = [ ...myTimelineTweetData, tweet ];
    // returns 5 tweet objects from reverse chron order.
    // if the tweets include a referenced tweet (e.g. a retweet)
    // i need to somehow indicate that those tweets were retweeted.
    // if tweet.referenced_tweets != null {include logo rendering} (from the client side, at least)

    const medias = myTimeline.includes.medias(tweet);
    // console.log("medias is: ", medias);
    i++;
    if (i === 5) {
        // console.log("the tweet array", myTimelineTweetData);
        break;
    }
}

const myTimelineTweetDataObject = {
    tweetsDataArray: myTimelineTweetData
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
