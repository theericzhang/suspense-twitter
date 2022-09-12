import { React, useState, useEffect, useContext } from "react";
import Tweet from "./Tweet";
import Error from "./Error";
import { ColorSchemeContext } from "../App";

export default function Wrapper() {
    const [ tweetData, setTweetData ] = useState({});
    const [ errorMessage, setErrorMessage ] = useState(null);
    
    async function fetchTweetData() {
        const res = await fetch('http://localhost:5000/tweets');
        if (!res.ok) {
            console.log(res); // returns response with status code
            const responseError = await res.json();
            // returns server side generated error, e.g. 'could not find user'
            setErrorMessage(await responseError);
        }
        const data = await res.json();
        setTweetData(data);
        console.log(data);

        // try catchh block attempt at error handling
        // erroneous behavior - breaks rule of hooks. caught error will display rule of hooks error

        // try {
        //     const res = await fetch('http://localhost:5000/tweets');
        //     if (!res.ok) {
        //         console.log(res); // returns response with status code
        //         const responseError = await res.json();
        //         // returns server side generated error, e.g. 'could not find user'
        //         setErrorMessage(await responseError);
        //         throw new Error(responseError);
        //     }
        //     const data = await res.json();
        //     setTweetData(data);
        //     console.log(data);
        // } catch (error) {
        //     console.error(error);
        // }


        // fetch('http://localhost:5000/tweets')
        // .then((res) => {
        //     if (!res.ok) {
        //         const responseError = res.json();
        //         setErrorMessage(responseError);
        //         throw new Error('responseError');
        //     }
        //     const data = res.json();
        //     setTweetData(data);
        // }).catch(err => {
        //     console.error(err);
        // })

    }

    useEffect(() => {
        fetchTweetData();
        // To fetch again after data has been updated by user in search bar,
        // try passing the fetchTweetData(); function as a prop to the search bar class
        // then call the function after the post request has been made
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
            {errorMessage && <Error message={errorMessage.message} /> }
            {tweetComponentArray}
        </section>
    )
}