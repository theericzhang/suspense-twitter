import { Suspense, useState, useEffect, createContext } from "react";
import "./App.css";
import AppFrame from "./components/AppFrame";
import Toggle from "./components/Toggle";
import SearchBar from "./components/SearchBar";

export const ColorSchemeContext = createContext();

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

    return (
        <ColorSchemeContext.Provider value={colorScheme}>
            <div className="App" id={colorScheme === 'light' ? '' : 'dark'}>
                <div className="sidebar-column-left"></div>
                <AppFrame />
                <div className="sidebar-column-right">
                    <Toggle colorScheme={colorScheme} 
                            setColorScheme={setColorScheme}
                    />
                    <SearchBar colorScheme={colorScheme}/>
                </div>
            </div>
        </ColorSchemeContext.Provider>
    );
}

export default App;
