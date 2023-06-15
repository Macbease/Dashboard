import React from 'react';
import './viewEvent.css';

export default function ViewEvent({ setActiveState }) {
    return (
        <div className='admin-club-container'>
            <div className="admin-club-container-title text-center">All the events that are featuring...</div>
            <div className="admin-club-container-carousel"></div>
            <div className="admin-club-container-create-button text-center hover-effect" onClick={() => setActiveState("Create")}>Create a new event</div>
        </div>
    )
}
