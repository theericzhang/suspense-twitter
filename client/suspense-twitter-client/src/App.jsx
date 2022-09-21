import { Suspense, useState, useEffect, createContext } from "react";
import "./App.css";
import AppFrame from "./components/AppFrame";
import Toggle from "./components/Toggle";
import SearchBar from "./components/SearchBar";
import Tweet from "./components/Tweet";

export const ColorSchemeContext = createContext();
export const TweetComponentArrayContext = createContext();
export const ErrorMessageContext = createContext();
export const ProviderFunction = createContext();
export const IsTweetLoadingContext = createContext();

function App() {

    const [ colorScheme, setColorScheme ] = useState(
        // we need to set the initial state to the color-scheme seen by the browser api first.
        // cannot be useState('') or useState(null), since they are falsy values and will default to dark mode first, then produce an unwanted animation
        // if the actual preferred color scheme is light
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );

    // using window events to detect color scheme set by user
    function detectColorScheme () {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setColorScheme('dark');
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            setColorScheme('light');
        }
    }

    useEffect(() => {
        detectColorScheme();
    }, []);

    if (colorScheme === 'dark') {
        document.body.style.backgroundColor = "#15202B";
    } else if (colorScheme === 'light') {
        document.body.style.backgroundColor = "#FFFFFF";
    }

    // loading state
    const [ isTweetLoading, setIsTweetLoading ] = useState(true);

    // data
    const [ tweetData, setTweetData ] = useState({});
    const [ errorMessage, setErrorMessage ] = useState(null);

    const errorMessageObject = { errorMessage, setErrorMessage };
    
    async function fetchTweetData(usernameQuery) {
        console.log("hey babe i'm logging rn");
        // resetting error message to a falsy value 
        // user tries looking for a nonexistent user, the error message is set
        // user queries another user, but the message needs to be reset to make the && shortcircuit false
        setErrorMessage('');
        try {
            const res = await fetch(`http://localhost:5000/tweets/${usernameQuery}`);
            if (!res.ok) {
                console.log(res); // returns response with status code
                setTweetData(null);
                setIsTweetLoading(false);
                console.log('should have set to false');
                setErrorMessage(await res.json());
                // throw new Error('')
                // returns server side generated error, e.g. 'could not find user'
            } else {
                const data = await res.json();
                setTweetData(await data);
                setIsTweetLoading(false);
                console.log(await data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    // put the fetchTweetData() function into an object, providerFunction to pass as context
    // fetchTweetData() needs to be called in SearchBar.jsx when the user enters a search query.
    // User types new query 
    // Submit handler takes input, FETCHes it to localhost:5000/search with POST header
    // After Fetch/POST, then perform a new fetch using the fetchTweetData() setter
    const providerFunction = { fetchTweetData };

    useEffect(() => {
        fetchTweetData('POTUS');
        // To fetch again after data has been updated by user in search bar,
        // try passing the fetchTweetData(); function as a prop to the search bar class
        // then call the function after the post request has been made
    }, []);


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

    return (
        <ColorSchemeContext.Provider value={colorScheme}>
            <div className="App" id={colorScheme === 'light' ? '' : 'dark'}>
                <div className="sidebar-column-left"></div>
                <ErrorMessageContext.Provider value={{errorMessage, setErrorMessage}}>
                    <TweetComponentArrayContext.Provider value={tweetComponentArray}>
                            <IsTweetLoadingContext.Provider value={isTweetLoading}>
                                <AppFrame />
                            </IsTweetLoadingContext.Provider>
                    </TweetComponentArrayContext.Provider>
                    <div className="sidebar-column-right">
                        <Toggle colorScheme={colorScheme} 
                                setColorScheme={setColorScheme}
                                />
                        <ProviderFunction.Provider value={providerFunction}> 
                            <SearchBar colorScheme={colorScheme}
                                    setIsTweetLoading={setIsTweetLoading}
                                    />
                        </ProviderFunction.Provider>
                    </div>
                </ErrorMessageContext.Provider>
            </div>
        </ColorSchemeContext.Provider>
    );
}

export default App;
