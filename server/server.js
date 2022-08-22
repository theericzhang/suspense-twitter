import { TwitterApi } from "twitter-api-v2";
import 'dotenv/config';

console.log("server started")

const clientMain = new TwitterApi(process.env.BEARER_TOKEN)

// const clientMain = new TwitterApi(
//     {
//         clientId : process.env.CLIENT_ID,
//         clientSecret : process.env.CLIENT_SECRET
//     }
// )
const roClient = clientMain.readOnly;

// const myTimeline = await roClient.v1.homeTimeline();
// console.log(myTimeline.tweets.length, 'fetched.');

const user = await roClient.v2.usersByUsernames('anericzhang')
// console.log("success", user);

const myTwitterId = user?.data[0]?.id;
console.log(myTwitterId);

// const myTimeline = await roClient.v2.homeTimeline(myTwitterId)

const myTimeline = await roClient.v2.userTimeline(myTwitterId, {
    max_results: 5,
    expansions: ['attachments.media_keys', 'attachments.poll_ids', 'referenced_tweets.id'],
    'media.fields': ['url'],
  });
  
  // myTimeline.includes contains a TwitterV2IncludesHelper instance
  // how can i change this to display only 5 tweets?

console.log("logging data: ", myTimeline.data)
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

