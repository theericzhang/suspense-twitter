import { Suspense, useState, useEffect, createContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppFrame from "./components/AppFrame";
import Toggle from "./components/Toggle";

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

    // if (colorScheme === 'light') {
    //     document.body.style.backgroundColor = "#15202B";
    // } else if (colorScheme === 'dark') {
    //     document.body.style.backgroundColor = "#FFFFFF";
    // }

    return (
        <ColorSchemeContext.Provider value={colorScheme}>
            <div className="App" id={colorScheme === 'light' ? '' : 'dark'}>
                <AppFrame />
                <Toggle colorScheme={colorScheme} 
                        setColorScheme={setColorScheme}
                />
            </div>
        </ColorSchemeContext.Provider>
    );
}

export default App;
