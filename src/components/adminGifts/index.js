import React, { useState } from 'react';
import "./adminGifts.css";
import CreateGift from './createGift';
import GiftOverview from './giftOverview';


export default function AdminGifts() {
    const [activeState, setActiveState] = useState("home");
    function getCorrectDisplay() {
        switch (activeState) {
            case "home":
                return <GiftOverview setActiveState={setActiveState} />
            case "create":
                return <CreateGift setActiveState={setActiveState} />
            default:
                return <GiftOverview setActiveState={setActiveState} />
        }
    }

    return (
        <div>
            <div className='admin-club-container absolute-center'>
                {getCorrectDisplay()}
            </div>
            <div className="props-overview-controls absolute-center" style={{ justifyContent: "space-around" }}>

                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("create") }}>Create a new gift</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("Receive") }}>Delete an existing gift</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("Delete") }}>Set the gift in locker</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("Dispatch") }}>Dispatch</div>
            </div>
        </div>

    )
}
