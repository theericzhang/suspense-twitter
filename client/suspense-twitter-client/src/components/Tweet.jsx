import { React } from "react";
import ReplyIcon from '../icons/Reply.svg'
import RetweetIcon from '../icons/Retweet.svg'
import ReactIcon from '../icons/React.svg'
import ShareIcon from '../icons/Share.svg'

export default function Tweet( { text,
                                 displayName,
                                 username,
                                 profile_image_url
                                } ) 
{
    return (
        <div className="tweet-wrapper">
            <div className="tweet-avatar-column">
                <img src={`${profile_image_url}`} alt="" className="user-avatar" />
            </div>
            <div className="tweet-body">
                <div className="tweet-meta-info">
                    <h4 className="display-name">{displayName}</h4>
                    <h4 className="username">@{username}</h4>
                </div>
                <p className="tweet-body-text">{text}</p>
                {/* determine if there is media to be displayed */}
                <div className="tweet-actions">
                    <div className="tweet-action-wrapper">
                        <button className="tweet-action-button">
                            <img src={ReplyIcon} alt="" className="tweet-actions-icon" />
                        </button>
                        <h4 className="tweet-action-counter">30</h4>
                    </div>
                    <div className="tweet-action-wrapper">
                        <button className="tweet-action-button">
                            <img src={RetweetIcon} alt="" className="tweet-actions-icon" />
                        </button>
                        <h4 className="tweet-action-counter">30</h4>
                    </div>
                    <div className="tweet-action-wrapper">
                        <button className="tweet-action-button">
                            <img src={ReactIcon} alt="" className="tweet-actions-icon" />
                        </button>
                        <h4 className="tweet-action-counter">30</h4>
                    </div>
                    <div className="tweet-action-wrapper">
                        <button className="tweet-action-button">
                            <img src={ShareIcon} alt="" className="tweet-actions-icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}