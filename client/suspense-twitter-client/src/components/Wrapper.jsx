import { React, useContext } from "react";
import Tweet from "./Tweet";
import { TweetDataContext } from "../App";

export default function Wrapper() {
    const tweetDataArray = useContext(TweetDataContext)
    return(
        <section className="wrapper">
            <h2>test content</h2>
            <Tweet />
        </section>
    )
}