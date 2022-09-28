import React, { useState } from "react";
import { useContext } from "react";
import { ProviderFunction } from "../App";
import { ErrorMessageContext } from "../App";
import { SetTweetDataContext } from "../App";

export default function SearchBar( { colorScheme,
                                     setIsTweetLoading
                                   } ) 
{
    const { fetchTweetData } = useContext(ProviderFunction);
    const [ inputText, setInputText ] = useState('');
    const { errorMessage, setErrorMessage } = useContext(ErrorMessageContext);
    const setTweetData = useContext(SetTweetDataContext);

    function inputHandler(e) {
        setInputText(e.target.value);
        console.log(e.target.value);
    }

    function submitHandler(e) {
        // submit request to server side?
        e.preventDefault();
        console.log('payload: ', inputText);
        setErrorMessage('');

        // validate input? 
        // check for regex ^[A-Za-z0-9_]{1,15}$
        const isValidExpression = /^[A-Za-z0-9_]{1,15}$/.test(inputText);
        if (!!inputText && isValidExpression) {
            fetch('api/search', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({parcel: inputText})
            }).then((res) => {
                if (res.ok) {
                    console.log("Supposed to fetch here");
                    setIsTweetLoading(true);
                    // fetchTweetData(inputText);
                    setTimeout(() => {
                        console.log("Supposed to fetch here");
                        fetchTweetData(inputText);
                        setInputText('');
                    }, 2000)
                }
            });
        } 
        // handling the case where inputText is truthy but it fails expression test
        // we have to handle error here otherwise node will close the connection if we try to fetch with inputText
        else if (!!inputText && !isValidExpression) {
            setIsTweetLoading(true);
            setTimeout(() => {
                setTweetData({});
                setIsTweetLoading(false);
                setErrorMessage(
                    {
                        message: `Could not find user ${inputText}. \n
                        Twitter usernames cannot be longer than 15 characters and can only contain alphanumeric characters (letters A-Z, numbers 0-9) with the exception of underscores. \n
                        Check to make sure your desired username doesn't contain any symbols, dashes, or spaces.`
                    }
                );
            }, 500);
        } else {
            // do nothing
            // if input field is empty, don't do anything on submit
        }

    }

    return (
        <>
            <div className="search-bar-wrapper">
                <div className="search-bar-outer">
                    <form onSubmit={submitHandler}>
                        <input type="text" 
                            className="search-bar" 
                            value={inputText} 
                            onChange={(e) => inputHandler(e)}
                            placeholder="Search Twitter Users"
                            spellCheck="false"
                            id={colorScheme === 'light' ? '' : 'search-bar-dark'}
                        />
                    </form>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon" id={colorScheme === 'light' ? '' : 'search-icon-dark'}><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                </div>
            </div>
            
        </>
    )
}