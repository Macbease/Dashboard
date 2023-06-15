import React, { useState } from 'react';
import "./adminEvent.css";
import ViewEvent from './viewEvent';
import CreateEvent from './createEvent';

export default function AdminEvent() {
    const [activeState, setActiveState] = useState("View");
    return (
        <div>
            {getCorrectDisplay(activeState, setActiveState)}
        </div>
    )
}

const getCorrectDisplay = (activeState, setActiveState) => {
    switch (activeState) {
        case "View":
            return <ViewEvent setActiveState={setActiveState} />
        case "Create":
            return <CreateEvent setActiveState={setActiveState} />
        default:
            break;
    }
}
