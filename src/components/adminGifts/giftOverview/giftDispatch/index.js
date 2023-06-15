import React, { useState } from 'react';
import './giftDispatch.css';
import axios from 'axios';

export default function GiftDispatch({ dispatchState, setDispatchState }) {
    const [lockerId, setLockerId] = useState("");
    const [code, setCode] = useState("");

    async function handleSubmissionEvent() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
        const data = { code, locker: lockerId };
        axios.post("http://localhost:5050/api/v1/gifts/dispatch", data, config)
            .then((res) => { alert(res.data) })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    return (
        <div className='gift-text-container absolute-center-column'>
            <div className='goBackToTemplate'>
                <span class="material-symbols-outlined hover-effect" onClick={() => { setDispatchState(null) }}>
                    arrow_back_ios
                </span>
            </div>
            <div className="gift-text-title">Dispatch the gift</div>
            <div className="gift-text-message absolute-center-column">
                <div className="create-prop-form-label text-center" >Locker-Id</div>
                <input type="text" placeholder='Enter the locker id assigned...' className='create-prop-form-input' onChange={(e) => { setLockerId(e.target.value) }} value={lockerId} />
                <div className="create-prop-form-label text-center">Code</div>
                <input type="text" placeholder='Enter the code assigned...' className='create-prop-form-input' onChange={(e) => { setCode(e.target.value) }} value={code} />
                <div className="create-prop-form-button text-center hover-effect" style={{ marginTop: "18px" }} onClick={handleSubmissionEvent}>Dispatch</div>
            </div>
        </div>
    )
}
