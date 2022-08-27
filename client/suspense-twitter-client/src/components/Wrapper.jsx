import { React, useContext } from "react";
import Tweet from "./Tweet";
import { TweetDataContext } from "../App";

export default function Wrapper() {
    const tweetResponseArray = useContext(TweetDataContext);
    const tweetDataArray = tweetResponseArray?.myTimelineTweetDataObject?.tweetsDataArray;
    const tweetComponentArray = tweetDataArray?.map((tweetData, index) => {
        return <Tweet text={tweetData.text} 
                      key={tweetData + index} />
    })

    console.log(tweetComponentArray);
    
    return (
        <section className="wrapper">
            <h2>test content</h2>
            {tweetComponentArray}
        </section>
    )
}