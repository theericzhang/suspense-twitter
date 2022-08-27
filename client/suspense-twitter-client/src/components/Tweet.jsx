import { React } from "react";

export default function Tweet( {text} ) {
    return (
        <div className="tweet-wrapper">
            {text}
        </div>
    )
}