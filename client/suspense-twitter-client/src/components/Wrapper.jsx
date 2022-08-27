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