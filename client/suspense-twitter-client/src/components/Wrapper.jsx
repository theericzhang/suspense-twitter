import { React, useState, useEffect } from "react";
import Tweet from "./Tweet";

export default function Wrapper() {
    const [ tweetData, setTweetData ] = useState({});
    
    async function fetchTweetData() {
        const res = await fetch('http://localhost:5000/tweets');
        const data = await res.json();
        setTweetData(data);
        console.log(data);
    }

    useEffect(() => {
        fetchTweetData();
    }, [])

    const tweetDataArray = tweetData?.myTimelineTweetDataObject?.tweetsDataArray;
    const myUserProfileData = tweetData?.myTimelineTweetDataObject?.myUserProfileData;
    const tweetComponentArray = tweetDataArray?.map((tweetData, index) => {
        return (
            <Tweet text={tweetData.text}
                   displayName={myUserProfileData?.data[0]?.name}
                   username={myUserProfileData?.data[0]?.username}
                   profile_image_url={myUserProfileData?.data[0]?.profile_image_url} 
                   key={tweetData + index} 
                   isLastTweet={index === tweetDataArray?.length - 1}
            />
        )
    })

    console.log(tweetComponentArray);
    
    return (
        <section className="wrapper">
            {tweetComponentArray}
        </section>
    )
}