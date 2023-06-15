import React, { useState } from 'react';
import Sorting from './sorting.js';
import './adminCard.css';

export default function AdminCard() {
    const [activeState, setActiveState] = useState("home");

    function getCorrectDisplay() {
        switch (activeState) {
            case "home":
                return <Sorting setActiveState={setActiveState} />
            default:
                return <Sorting setActiveState={setActiveState} />
        }
    }

    return (
        <div>
            <div className='admin-club-container absolute-center'>
                {getCorrectDisplay()}
            </div>
            <div className="props-overview-controls absolute-center" style={{ justifyContent: "space-around" }}></div>
        </div>
    )
}
