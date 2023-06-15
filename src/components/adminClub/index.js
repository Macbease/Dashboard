import React, { useState } from 'react';
import './adminClub.css';
import CreateClub from './createClub';
import ViewClub from './viewClub';

export default function AdminClub() {
    const [activeState, setActiveState] = useState("View");
    return (
        <>
            {getCorrectDisplay(activeState, setActiveState)}
        </>
    )
}

const getCorrectDisplay = (activeState, setActiveState) => {
    switch (activeState) {
        case "View":
            return <ViewClub setActiveState={setActiveState} />
        case "Create":
            return <CreateClub setActiveState={setActiveState} />
        default:
            break;
    }
}