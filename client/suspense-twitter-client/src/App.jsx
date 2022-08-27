import { useState, useEffect, createContext, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppFrame from "./components/AppFrame";

export const TweetDataContext = createContext();

function App() {
    const [ tweetData, setTweetData ] = useState({});
    
    async function fetchTweetData() {
        const res = await fetch('http://localhost:5000/tweets');
        const data = await res.json();
        setTweetData(data);
        console.log(data);
    }

    useEffect(() => {
        fetchTweetData();
    }, [])
    
    return (
        <div className="App">
            {/* {tweetData !== {} &&  */}
                <TweetDataContext.Provider value={tweetData}>
                    <AppFrame />
                </TweetDataContext.Provider>
            {/* } */}
        </div>
    );
}

export default App;
