import { Suspense, useState, useEffect, createContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppFrame from "./components/AppFrame";

export const ColorSchemeContext = createContext();

function App() {

    const [ colorScheme, setColorScheme ] = useState('');

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

    return (
        <ColorSchemeContext.Provider value={colorScheme}>
            <div className="App" id={colorScheme === 'light' ? '' : 'dark'}>
                <AppFrame />
            </div>
        </ColorSchemeContext.Provider>
    );
}

export default App;
