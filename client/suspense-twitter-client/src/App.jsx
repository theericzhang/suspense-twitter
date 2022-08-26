import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppFrame from "./components/AppFrame";

function App() {
    const [ tweetData, setTweetData ] = useState({});
    
    async function fetchTweetData() {
        const res = await fetch('http://localhost:5000/tweets');
        const data = await res.json();
        setTweetData(data)
        console.log(data)
    }

    useEffect(() => {
        fetchTweetData();
    }, [])
    
    return (
        <div className="App">
            <AppFrame />
        </div>
    );
}

export default App;
