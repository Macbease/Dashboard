import React from 'react';
import './viewClub.css';

export default function ViewClub({ setActiveState }) {
    return (
        <div className='admin-club-container'>
            <div className="admin-club-container-title text-center">All the clubs that are online...</div>
            <div className="admin-club-container-carousel"></div>
            <div className="admin-club-container-create-button text-center hover-effect" onClick={() => setActiveState("Create")}>Create a new club</div>
        </div>
    )
}
