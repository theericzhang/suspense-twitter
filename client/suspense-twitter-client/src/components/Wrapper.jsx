import { React, useState, useEffect, useContext } from "react";
import Tweet from "./Tweet";
import Error from "./Error";
import ShimmerTweet from "./ShimmerTweet";
import { ColorSchemeContext } from "../App";
import { TweetComponentArrayContext } from "../App";
import { ErrorMessageContext } from "../App";
import { IsTweetLoadingContext } from "../App";

export default function Wrapper() {
    const colorScheme = useContext(ColorSchemeContext);
    const tweetComponentArray = useContext(TweetComponentArrayContext);
    const errorMessage = useContext(ErrorMessageContext);
    const isTweetLoading = useContext(IsTweetLoadingContext);
    console.log(tweetComponentArray);

    const tweetShimmerComponentArray = Array(5).fill(1).map((tweetShimmer, index) => {
                                                                return (
                                                                    <ShimmerTweet colorScheme={colorScheme}
                                                                                key={index}/>
                                                                )}
    )
    
    return (
        <section className="wrapper" id={colorScheme === 'light' ? '' : 'dark-wrapper'}>
            {errorMessage && <Error message={errorMessage.message} /> }
            {/* {<ShimmerTweet colorScheme={colorScheme}/>} */}
            {isTweetLoading ? tweetShimmerComponentArray : tweetComponentArray}
            {/* {!isTweetLoading ? tweetShimmerComponentArray : ''} */}
        </section>
    )
}