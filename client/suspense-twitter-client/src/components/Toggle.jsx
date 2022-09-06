import React, { useState } from "react";

export default function Toggle( { colorScheme, setColorScheme } ) {
    return (
        <button className="toggle-wrapper" id={colorScheme === 'light' ? 'toggle-wrapper-light' : 'toggle-wrapper-dark'} onClick={() => {if (colorScheme === 'light') {setColorScheme('dark')} else (setColorScheme('light'))}}>
            <div className="toggle-circle" id={colorScheme === 'light' ? 'toggle-circle-light' : 'toggle-circle-dark'}>

            </div>
        </button>
    )
}