import { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppFrame from "./components/AppFrame";

// export const TweetDataContext = createContext();

function App() {
    return (
        <div className="App">
            <AppFrame />
        </div>
    );
}

export default App;
