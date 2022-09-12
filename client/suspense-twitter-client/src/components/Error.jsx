import React from "react";
import { useContext } from "react";
import { ColorSchemeContext } from "../App";

export default function Error ( {message} ) {
    const colorScheme = useContext(ColorSchemeContext); 
    return (
        <div className="error-wrapper">
            <h3 className="error-message" id={colorScheme === 'light' ? '' : 'dark-secondary'}>
                {message}
            </h3>
        </div>
    )
}