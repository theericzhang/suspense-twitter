import { React } from "react";

export default function Tweet( { text,
                                 displayName,
                                 username,
                                 profile_image_url,
                                 isVerified,
                                 public_metrics,
                                 time_created,
                                 currentTimeSinceEpochInms,
                                 mediaArray,
                                 isLastTweet
                                } ) 
{

    // by parsing the time_created time, we will be able to see how many ms have elapsed since the unix epoch
    // subtracting this value from currentTimeSinceEpochInms allows us to see in ms how long it has been.
    // with this difference in ms, we can see if it's been longer than a minute, hour, day, or year. This way we can display the appropriate unit for time elapsed.
    const timeCreatedInms = Date.parse(time_created);

    // create a new Date object so that we can perform getHours, getMinutes, getSeconds, etc.
    // Using those values, we will be able to calculate the time difference between the current time and the time of tweet
    const timeCreatedObject = new Date(time_created);
    const timeCreatedObjectMonth = timeCreatedObject.getMonth();
    const timeCreatedObjectYear = timeCreatedObject.getFullYear();
    
    const timeNow = new Date();
    const timeNowYear = timeNow.getFullYear();

    // converting time units to milliseconds to compare with the difference btwn currentTimeSinceEpochInms and timeCreatedInms
    // for example, if we see that the difference is greater than a minute, we know that its value is at least a minute - meaning we can possibly display a 'm' unit for the tweetTimePlaceholder.
    const msInADay = 86400000;
    const msInAnHour = 3600000;
    const msInAMinute = 60000;
    const msInASecond = 1000;

    const isOlderThanStartOfYear = timeNowYear > timeCreatedObjectYear;
    const isOlderThanOneDay = currentTimeSinceEpochInms - timeCreatedInms > msInADay;
    const isOlderThanOneHour = currentTimeSinceEpochInms - timeCreatedInms > msInAnHour;
    const isOlderThanOneMinute = currentTimeSinceEpochInms - timeCreatedInms > msInAMinute;
    const isOlderThanOneSecond = currentTimeSinceEpochInms - timeCreatedInms > msInASecond;

    const monthToString = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    let tweetTimePlaceholder = "";
    if ( isOlderThanStartOfYear ) {
        tweetTimePlaceholder = monthToString[timeCreatedObjectMonth] + " " + timeCreatedObject.getDate() + ", " + timeCreatedObject.getFullYear();
    } else if ( !isOlderThanStartOfYear && isOlderThanOneDay ) {
        // display the date (month, day)
        // console.log("how u do this one ");
        // console.log("Expected longer than a day old: " + timeCreatedObject.getMonth() + " " + timeCreatedObject.getDate());
        tweetTimePlaceholder = monthToString[timeCreatedObjectMonth] + " " + timeCreatedObject.getDate();
    } else if ( !isOlderThanOneDay && isOlderThanOneHour ) {
        // display hours + 'h' 
        // console.log("hours: ", Math.floor((currentTimeSinceEpochInms - timeCreatedInms) / msInAnHour));
        tweetTimePlaceholder = Math.floor((currentTimeSinceEpochInms - timeCreatedInms) / msInAnHour) + "h";
    } else if ( !isOlderThanOneHour && isOlderThanOneMinute ) {
        // display minutes + 'm'
        // console.log("minutes: ", Math.floor((currentTimeSinceEpochInms - timeCreatedInms) / msInAMinute));
        tweetTimePlaceholder = Math.floor((currentTimeSinceEpochInms - timeCreatedInms) / msInAMinute) + "m";
    } else if ( !isOlderThanOneMinute && isOlderThanOneSecond ) {
        // display seconds + "s"
        // console.log("seconds: ", Math.floor((currentTimeSinceEpochInms - timeCreatedInms) / msInASecond));
        tweetTimePlaceholder = Math.floor((currentTimeSinceEpochInms - timeCreatedInms) / msInASecond) + "s";
    } else {}

    // media
    const isMediaEmpty = mediaArray.length === 0;
    const isMediaTypePhoto = mediaArray[0]?.url !== undefined ? true : false;

    return (
        <>
            <div className="tweet-wrapper">
                <div className="tweet-avatar-column">
                    <img src={`${profile_image_url}`} alt="" className="user-avatar" />
                </div>
                <div className="tweet-body">
                    <div className="tweet-meta-info">
                        <h4 className="display-name">{displayName}</h4>
                        {isVerified && <svg viewBox="0 0 24 24" className="verified-account-logo" fill="rgb(29, 155, 240)">
                                           <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                       </svg>
                        }
                        <h4 className="username">@{username}</h4>
                        <h4 className="interpunct">·</h4>
                        <h4 className="tweet-time">{tweetTimePlaceholder}</h4>
                    </div>
                    <p className="tweet-body-text">{text}</p>
                    {/* determine if there is media to be displayed */}
                    {!isMediaEmpty && <div className="tweet-body-media-wrapper">
                                          <img src={isMediaTypePhoto ? mediaArray[0]?.url : mediaArray[0]?.preview_image_url} alt="" className="tweet-body-media" />
                                      </div>
                    }
                    <div className="tweet-actions">
                        <div className="tweet-action-wrapper">
                            <button className="tweet-action-button">
                            <svg width="20" height="21" className="tweet-actions-icon" id="reply" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.705 2.36833L8.24831 2.36H8.24664C4.60164 2.36 1.74664 5.21583 1.74664 8.86167C1.74664 12.2767 4.40164 14.8667 7.96748 15.0033V18.1933C7.96748 18.2833 8.00414 18.4317 8.06748 18.5292C8.18581 18.7167 8.38748 18.8183 8.59414 18.8183C8.70914 18.8183 8.82498 18.7867 8.92914 18.72C9.14914 18.58 14.3233 15.27 15.6691 14.1317C17.2541 12.79 18.2025 10.8233 18.205 8.87167V8.8575C18.2 5.21833 15.3466 2.36833 11.705 2.3675V2.36833ZM14.8608 13.1783C13.9158 13.9783 10.8091 16.0158 9.21748 17.0475V14.3917C9.21748 14.0467 8.93831 13.7667 8.59248 13.7667H8.26248C5.21248 13.7667 2.99748 11.7033 2.99748 8.86167C2.99748 5.91667 5.30414 3.61 8.24748 3.61L11.7033 3.61833H11.705C14.6483 3.61833 16.955 5.92333 16.9566 8.865C16.9541 10.4567 16.1716 12.0683 14.8616 13.1783H14.8608Z" fill=""/>
                            </svg>
                            </button>
                            <h4 className="tweet-action-counter" id="replyCounter">{public_metrics?.reply_count == 0 ? '' : public_metrics?.reply_count}</h4>
                        </div>
                        <div className="tweet-action-wrapper">
                            <button className="tweet-action-button">
                            <svg width="20" height="20" className="tweet-actions-icon" id="retweet" viewBox="0 0 20 21" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.8083 13.5583C19.565 13.3142 19.1692 13.3142 18.925 13.5583L17.075 15.4083V6.87501C17.075 5.15167 15.6725 3.75 13.95 3.75H9.075C8.73 3.75 8.45 4.03 8.45 4.375C8.45 4.72 8.73 5 9.075 5H13.95C14.9833 5 15.825 5.84167 15.825 6.87501V15.4083L13.975 13.5583C13.7308 13.3142 13.335 13.3142 13.0917 13.5583C12.8483 13.8025 12.8467 14.1983 13.0917 14.4417L16.0083 17.3583C16.1292 17.4808 16.2892 17.5417 16.45 17.5417C16.6108 17.5417 16.7692 17.4817 16.8917 17.3583L19.8083 14.4417C20.0533 14.1983 20.0533 13.8025 19.8083 13.5583ZM10.925 16.2917H6.05C5.01667 16.2917 4.175 15.45 4.175 14.4167V5.88334L6.025 7.73334C6.14833 7.85584 6.30833 7.91667 6.46833 7.91667C6.62833 7.91667 6.78833 7.85584 6.91 7.73334C7.15417 7.48917 7.15417 7.09334 6.91 6.85L3.99333 3.93334C3.74917 3.68834 3.35333 3.68834 3.11 3.93334L0.193333 6.85C-0.0516675 7.09334 -0.0516675 7.48917 0.193333 7.73334C0.438332 7.97751 0.832499 7.97751 1.07667 7.73334L2.92667 5.88334V14.4167C2.92667 16.14 4.32917 17.5417 6.05167 17.5417H10.9267C11.2717 17.5417 11.5517 17.2617 11.5517 16.9167C11.5517 16.5717 11.2708 16.2917 10.9267 16.2917H10.925Z" fill=""/>
                            </svg>
                            </button>
                            <h4 className="tweet-action-counter" id="retweetCounter">{public_metrics?.retweet_count == 0 ? '' : public_metrics?.retweet_count}</h4>
                        </div>
                        <div className="tweet-action-wrapper">
                            <button className="tweet-action-button">
                            <svg width="20" height="21" className="tweet-actions-icon" id="react" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 18.5317H9.98833C7.83583 18.4917 1.625 12.88 1.625 7.565C1.625 5.01167 3.72917 2.77 6.1275 2.77C8.03583 2.77 9.31917 4.08667 9.99917 5.045C10.6775 4.08834 11.9608 2.77 13.87 2.77C16.27 2.77 18.3733 5.01167 18.3733 7.56584C18.3733 12.8792 12.1617 18.4908 10.0092 18.53H10V18.5317ZM6.12833 4.02084C4.395 4.02084 2.87583 5.6775 2.87583 7.56667C2.87583 12.35 8.7375 17.23 10.0008 17.2817C11.2658 17.23 17.1258 12.3508 17.1258 7.56667C17.1258 5.6775 15.6067 4.02084 13.8733 4.02084C11.7667 4.02084 10.59 6.4675 10.58 6.49167C10.3883 6.96 9.61667 6.96 9.42417 6.49167C9.4125 6.46667 8.23667 4.02084 6.12917 4.02084H6.12833Z" fill=""/>
                            </svg>
                            </button>
                            <h4 className="tweet-action-counter" id="reactCounter">{public_metrics?.like_count == 0 ? '' : public_metrics?.like_count}</h4>
                        </div>
                        <div className="tweet-action-wrapper">
                            <button className="tweet-action-button">
                            <svg width="20" height="21" className="tweet-actions-icon" id="share" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6083 6.72501L10.4416 2.55834C10.1975 2.31417 9.80164 2.31417 9.5583 2.55834L5.39164 6.72501C5.14664 6.96917 5.14664 7.36501 5.39164 7.60834C5.63664 7.85167 6.0308 7.85334 6.27497 7.60834L9.37497 4.50834V13C9.37497 13.345 9.65497 13.625 9.99997 13.625C10.345 13.625 10.625 13.345 10.625 13V4.50834L13.725 7.60834C13.8466 7.73084 14.0066 7.79167 14.1666 7.79167C14.3266 7.79167 14.4866 7.73167 14.6083 7.60834C14.8525 7.36417 14.8525 6.96917 14.6083 6.72501Z" fill=""/>
                                <path d="M16.4233 18.7867H3.57663C2.52329 18.7867 1.66663 17.93 1.66663 16.8767V12.1667C1.66663 11.8217 1.94663 11.5417 2.29163 11.5417C2.63663 11.5417 2.91663 11.8217 2.91663 12.1667V16.8767C2.91663 17.2408 3.21246 17.5367 3.57663 17.5367H16.4233C16.7875 17.5367 17.0833 17.2408 17.0833 16.8767V12.1667C17.0833 11.8217 17.3633 11.5417 17.7083 11.5417C18.0533 11.5417 18.3333 11.8217 18.3333 12.1667V16.8767C18.3333 17.93 17.4766 18.7867 16.4233 18.7867Z" fill=""/>
                            </svg>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {!isLastTweet && <hr className="tweet-divider" />}
        </>
    )
}