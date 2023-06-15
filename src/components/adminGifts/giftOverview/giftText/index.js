import React from 'react';
import './giftText.css';

export default function GiftText({ textState, setTextState }) {
    return (
        <div className='gift-text-container absolute-center-column'>
            <div className='goBackToTemplate'>
                <span class="material-symbols-outlined hover-effect" onClick={() => { setTextState(null) }} >
                    arrow_back_ios
                </span>
            </div>
            <div className="gift-text-title">Message</div>
            <div className="gift-text-message">{textState}</div>
        </div>
    )
}
