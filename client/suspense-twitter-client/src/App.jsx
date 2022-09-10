import { Suspense, useState, useEffect, createContext } from "react";
import "./App.css";
import AppFrame from "./components/AppFrame";
import Toggle from "./components/Toggle";
import SearchBar from "./components/SearchBar";

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

    // useEffect(() => {
    //     if (colorScheme === 'light') {
    //         document.body.style.backgroundColor = "#15202B";
    //     } else if (colorScheme === 'dark') {
    //         document.body.style.backgroundColor = "#FFFFFF";
    //     }
    // }, [colorScheme]);

    if (colorScheme === 'dark') {
        document.body.style.backgroundColor = "#15202B";
    } else if (colorScheme === 'light') {
        document.body.style.backgroundColor = "#FFFFFF";
    }

    return (
        <ColorSchemeContext.Provider value={colorScheme}>
            <div className="App" id={colorScheme === 'light' ? '' : 'dark'}>
                <AppFrame />
                <Toggle colorScheme={colorScheme} 
                        setColorScheme={setColorScheme}
                />
                <SearchBar colorScheme={colorScheme}/>
            </div>
        </ColorSchemeContext.Provider>
    );
}

export default App;
