import { TwitterApi } from "twitter-api-v2";
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

// use cors on our express instance to allow for data fetching from client-side
app.use(cors());

// letting our express instance know that we are expecting json
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// create a main Twitter client with our Bearer Token
const clientMain = new TwitterApi(process.env.BEARER_TOKEN);
const numberOfTweetsToFetch = 5;

// set this client to read-only since we are only pulling information from the API
const roClient = clientMain.readOnly;

let usernameQuery = "neee_eeed";

app.post("/search", (req, res) => {
    const { parcel } = req.body;
    if (!parcel) {
        res.status(400).send({ status: 'failed' })
    } else {
        res.status(200).send({ status: 'received' })
        console.log("parcel: ", parcel);
        fetchingTweets(parcel);
    }
    
})

fetchingTweets(usernameQuery);

async function fetchingTweets(usernameQuery) {
    // identify a user to pull data from (me)
    const user = await roClient.v2.usersByUsernames(usernameQuery, {
        "user.fields" : ["protected"]
    });

    // user could not be found - api returns an error property
    if (user?.hasOwnProperty("errors")) {
        console.log(`Could not find user ${usernameQuery}`);
        console.error(`Could not find user ${usernameQuery}`);
        app.get(`/tweets/${usernameQuery}`, (req, res) => {
            res.status(500).json({
                message: `Could not find user ${usernameQuery}, please try searching again`
            });
        });
    } 
    // user is protected - api returns a 'true' protected property
    else if (user?.data[0]?.protected) {
        console.log(`${usernameQuery}'s tweets are protected`);
        console.error(`${usernameQuery}'s tweets are protected`);
        app.get(`/tweets/${usernameQuery}`, (req, res) => {
            res.status(500).json({
                message: `${usernameQuery}'s tweets are protected`
            });
        });
    } 
    // response is ok, user has proper data
    else {
        console.log(user);
        const myTwitterId = user?.data[0]?.id;
        // console.log(myTwitterId);

        // GET user information. Returns Profile Image, Username, Display Name, and ID
        const myUserProfileData = await roClient.v2.users(myTwitterId, {
            "user.fields": ["profile_image_url", "verified", "protected"],
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

        async function findTweetsById(id) {
            const lookupById = await roClient.v2.singleTweet(id, {
                expansions: [
                    "attachments.media_keys",
                    "attachments.poll_ids",
                    "referenced_tweets.id",
                    "author_id",
                ],
                "tweet.fields": ["public_metrics", "created_at"],
                "media.fields": ["url", "preview_image_url"],
                "user.fields": ["profile_image_url", "verified", "url", "protected"],
            });
            // console.log(lookupById);
            // console.log(lookupById?.includes?.users);
            return lookupById;
        }

        let i = 0;
        let myTimelineTweetData = [];
        for await (const tweet of myTimeline) {
            // myTimelineTweetData = [ ...myTimelineTweetData, tweet ];

            if (tweet?.hasOwnProperty("referenced_tweets")) {
                // checking for the type of tweet
                // if tweet is a retweet, then we want to fetchh the original tweet with the id. this id is found by checking the referenced_tweets array, which contains the id of the original tweet
                if (tweet?.referenced_tweets[0]?.type === "retweeted") {
                    const referencedTweet = await findTweetsById(
                        tweet?.referenced_tweets[0]?.id
                    );
                    myTimelineTweetData = [
                        ...myTimelineTweetData,
                        {
                            tweet: referencedTweet?.data,
                            media: referencedTweet?.includes?.media,
                            author: referencedTweet?.includes?.users,
                            type: "retweeted",
                        },
                    ];
                } else if (tweet?.referenced_tweets[0]?.type === "quoted") {
                    const medias = myTimeline.includes.medias(tweet);
                    myTimelineTweetData = [
                        ...myTimelineTweetData,
                        {
                            tweet: tweet,
                            media: medias,
                            type: "quoted",
                        },
                    ];
                } else if (tweet?.referenced_tweets[0]?.type === "replied_to") {
                    const medias = myTimeline.includes.medias(tweet);
                    myTimelineTweetData = [
                        ...myTimelineTweetData,
                        {
                            tweet: tweet,
                            media: medias,
                            type: "replied_to",
                        },
                    ];
                }
            } else {
                const medias = myTimeline.includes.medias(tweet);
                myTimelineTweetData = [
                    ...myTimelineTweetData,
                    {
                        tweet: tweet,
                        media: medias,
                        type: "self",
                    },
                ];
            }
            // returns 5 tweet objects from reverse chron order.
            // if the tweets include a referenced tweet (e.g. a retweet)
            // i need to somehow indicate that those tweets were retweeted.
            // if tweet.referenced_tweets != null {include logo rendering} (from the client side, at least)

            // console.log(myTimelineTweetData);
            i++;
            if (i === numberOfTweetsToFetch) {
                // console.log("the tweet array", myTimelineTweetData);
                break;
            }
        }

        const myTimelineTweetDataObject = {
            tweetsDataArray: myTimelineTweetData,
            myUserProfileData: myUserProfileData,
        };

        if (myTimelineTweetData.length === 0) {
            app.get(`/tweets/${usernameQuery}`, (req, res) => {
                res.status(500).json({
                    message: `${usernameQuery} has no tweets`
                });
            });
            return;
        }

        getUser(myTimelineTweetDataObject, usernameQuery);
        console.log("should have updated: ", usernameQuery);
        return;
        
    }}

function getUser(myTimelineTweetDataObject, usernameQuery) {
    app.get(`/tweets/${usernameQuery}`, (_, res) => {
        res.json({ ok: true, myTimelineTweetDataObject });
    });
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});