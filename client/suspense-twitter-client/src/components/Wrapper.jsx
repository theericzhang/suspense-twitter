import { React, useState, useEffect, useContext } from "react";
import Tweet from "./Tweet";
import Error from "./Error";
import { ColorSchemeContext } from "../App";
import { TweetComponentArrayContext } from "../App";
import { ErrorMessageContext } from "../App";

export default function Wrapper() {
    const colorScheme = useContext(ColorSchemeContext);
    const tweetComponentArray = useContext(TweetComponentArrayContext);
    const errorMessage = useContext(ErrorMessageContext);
    console.log(tweetComponentArray);
    
    return (
        <section className="wrapper" id={colorScheme === 'light' ? '' : 'dark-wrapper'}>
            {errorMessage && <Error message={errorMessage.message} /> }
            {tweetComponentArray}
        </section>
    )
}