import React from "react";

export default function ShimmerTweet({colorScheme}) {
    return (
        <>
            <div className="tweet-wrapper" id={colorScheme === 'light' ? '' : 'dark-tweet-wrapper'}>
                <div className="tweet-avatar-column">
                    {/* <img src={`${profile_image_url}`} alt="" className="user-avatar" /> */}
                    <div className="user-avatar loading" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                </div>
                <div className="tweet-body">
                    <div className="tweet-meta-info">
                        <div className="meta-info-shimmer" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                    </div>
                    {/* <p className="tweet-body-text" id={colorScheme === 'light' ? '' : 'dark-tweet-body-text'}>{text}</p> */}
                    <div className="body-text-shimmer-wrapper">
                        <div className="body-text-shimmer-full" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                        <div className="body-text-shimmer-full" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                        <div className="body-text-shimmer-fraction" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                    </div>
                    <div className="body-media-wrapper-shimmer" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                    <div className="tweet-actions">
                        <div className="action-wrapper-shimmer" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                        <div className="action-wrapper-shimmer" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                        <div className="action-wrapper-shimmer" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                        <div className="action-wrapper-shimmer" id={colorScheme === 'light' ? '' : 'dark-loading'}></div>
                    </div>
                </div>
            </div>
            <hr className="tweet-divider" id={colorScheme === 'light' ? '' : 'tweet-divider-dark'} />
        </>
    )
}