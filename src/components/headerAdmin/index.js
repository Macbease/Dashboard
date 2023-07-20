import React from 'react';
import './headerAdmin.css';
import logo from '../../assets/img/mac.png';
import profile from '../../assets/img/profilePic.png';
import { Link } from "react-router-dom";

export default function AdminHeader({ activeTab, setActiveTab }) {
    return (
        <div className='max-width header'>
            <img src={logo} alt="Macbease-logo" className='header-logo' />
            <div className="header-left">
                <div className="admin-header-button-container hover-effect" onClick={() => setActiveTab("Vendor")} style={activeTab === "Vendor" ? { border: "1px solid var(--title-color)" } : { border: "none" }}>Vendor</div>
                <div className="admin-header-button-container hover-effect" onClick={() => setActiveTab("Club")} style={activeTab === "Club" ? { border: "1px solid var(--title-color)" } : { border: "none" }}>Club</div>
                <div className="admin-header-button-container hover-effect" onClick={() => setActiveTab("Event")} style={activeTab === "Event" ? { border: "1px solid var(--title-color)" } : { border: "none" }}>Event</div>
                <div className="admin-header-button-container hover-effect" onClick={() => setActiveTab("Props")} style={activeTab === "Props" ? { border: "1px solid var(--title-color)" } : { border: "none" }}>Props</div>
                <div className="admin-header-button-container hover-effect" onClick={() => setActiveTab("Gifts")} style={activeTab === "Gifts" ? { border: "1px solid var(--title-color)" } : { border: "none" }}>Gifts</div>
                <div className="admin-header-button-container hover-effect" onClick={() => setActiveTab("Cards")} style={activeTab === "Cards" ? { border: "1px solid var(--title-color)" } : { border: "none" }}>Cards</div>
                <div className="admin-header-button-container hover-effect" onClick={() => setActiveTab("Community")} style={activeTab === "Community" ? { border: "1px solid var(--title-color)" } : { border: "none" }}>Community</div>
                <div className="admin-header-button-container hover-effect" onClick={() => setActiveTab("Content")} style={activeTab === "Content" ? { border: "1px solid var(--title-color)" } : { border: "none" }}>Content</div>
                <div className="profile-wrapper">
                    <img src={profile} alt="Profile" className='profile-image' />
                </div>
            </div>
        </div>
    )
}
