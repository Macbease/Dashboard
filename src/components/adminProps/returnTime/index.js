import React, { useState } from 'react';
import axios from 'axios';

export default function ReturnTime({ setActiveState }) {
    const [id, setId] = useState();
    const [otp, setOtp] = useState();

    function handleSubmitEvent() {
        if (!id || !otp) {
            return alert("Please provide sufficient information to dispatch a prop.");
        }
        const data = { propId: id, otp: parseInt(otp) };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/props/timeOfReturn", data, config)
            .then((res) => {
                alert(res.data);
                setActiveState("Home");
            })
    }

    return (
        <div className='absolute-center-column'>
            <div className="create-prop-form-title text-center">
                <span class="material-symbols-outlined hover-effect" style={{ position: "absolute", left: "500px" }} onClick={() => { setActiveState("Home") }}>
                    arrow_back_ios
                </span>
                Check Return Time
            </div>
            <div className='create-prop-form-container absolute-center-column'>
                <div className="create-prop-form-label text-center">Prop Id</div>
                <input type="text" placeholder='Enter the unique id of the prop...' className='create-prop-form-input text-center' onChange={(e) => { setId(e.target.value) }} />
                <div className="create-prop-form-label text-center">OTP</div>
                <input type="text" placeholder='Enter the otp of the booking...' className='create-prop-form-input text-center' onChange={(e) => { setOtp(e.target.value) }} />
            </div>
            <div className="create-prop-form-button text-center hover-effect" onClick={handleSubmitEvent}>Check</div>
        </div>
    )
}
