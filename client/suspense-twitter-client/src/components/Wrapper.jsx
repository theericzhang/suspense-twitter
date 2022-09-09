import { React, useState, useEffect, useContext } from "react";
import Tweet from "./Tweet";
import { ColorSchemeContext } from "../App";

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
    }, []);

    const colorScheme = useContext(ColorSchemeContext);

    const currentDate = new Date();
    const currentTimeSinceEpochInms = currentDate.getTime();
    // console.log(currentTimeSinceEpochInms);
    const tweetDataArray = tweetData?.myTimelineTweetDataObject?.tweetsDataArray;
    const myUserProfileData = tweetData?.myTimelineTweetDataObject?.myUserProfileData;
    const tweetComponentArray = tweetDataArray?.map((tweetData, index) => {
        return (
            <Tweet text={tweetData?.tweet?.text}
                   type={tweetData?.type}
                   timelineOwnerDisplayName={myUserProfileData?.data[0]?.name}
                   displayName={tweetData?.hasOwnProperty("author") ? tweetData?.author[0]?.name : myUserProfileData?.data[0]?.name}
                   username={tweetData?.hasOwnProperty("author") ? tweetData?.author[0]?.username : myUserProfileData?.data[0]?.username}
                   profile_image_url={tweetData?.hasOwnProperty("author") ? tweetData?.author[0]?.profile_image_url : myUserProfileData?.data[0]?.profile_image_url}
                   isVerified={tweetData?.hasOwnProperty("author") ? tweetData?.author[0]?.verified : myUserProfileData?.data[0]?.verified}
                   public_metrics={tweetData?.tweet?.public_metrics} 
                   time_created={tweetData?.tweet?.created_at}
                   currentTimeSinceEpochInms={currentTimeSinceEpochInms}
                   mediaArray={tweetData?.media}
                   isLastTweet={index === tweetDataArray?.length - 1}
                   key={tweetData?.tweet + index} 
            />
        )
    })

    console.log(tweetComponentArray);
    
    return (
        <section className="wrapper" id={colorScheme === 'light' ? '' : 'dark-wrapper'}>
            {tweetComponentArray}
        </section>
    )
}