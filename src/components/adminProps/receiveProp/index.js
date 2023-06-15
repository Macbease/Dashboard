import React, { useState } from 'react';
import './receiveProp.css';
import axios from 'axios';
const generateUniqueId = require('generate-unique-id');

export default function ReceiveProp({ setActiveState }) {
    const [id, setId] = useState();
    const [rating, setRating] = useState();
    const [remark, setRemark] = useState();
    const [otp, setOtp] = useState();
    const [day, setDay] = useState();

    function handleSubmitEvent() {
        if (!id || !rating || !remark) {
            return alert("Insufficient data provided for submission of prop.");
        }
        const data = { id: id, adminRating: rating, adminRemark: remark, logId: generateUniqueId(), day: day, otp: parseInt(otp) }
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/props/returnProps", data, config)
            .then((res) => {
                alert(res.data);
                if (res.data === "Prop was successfully submitted.") {
                    setActiveState("Home");
                }
            })
    }

    return (
        <div className='absolute-center-column'>
            <div className="create-prop-form-title text-center">
                <span class="material-symbols-outlined hover-effect" style={{ position: "absolute", left: "500px" }} onClick={() => { setActiveState("Home") }}>
                    arrow_back_ios
                </span>
                Prop Receiving form
            </div>
            <div className='create-prop-form-container absolute-center-column'>
                <input type="text" placeholder='Enter the unique id of the prop...' className='create-prop-form-input' onChange={(e) => { setId(e.target.value) }} value={id} style={{ width: "350px" }} />
                <div className="absolute-center">
                    <div className="create-prop-form-label text-center" style={{ width: "150px", borderRadius: "22px 0px 0px 22px" }}>Admin Rating</div>
                    <input type="number" placeholder='Rating (1 to 5)' className='create-prop-form-input text-center' min={1} max={5} step={0.1} style={{ borderRadius: "0px 22px 22px 0px", width: "200px" }} onChange={(e) => { setRating(e.target.value) }} value={rating} />
                </div>
                <div className="absolute-center">
                    <div className="create-prop-form-label text-center" style={{ width: "150px", borderRadius: "22px 0px 0px 22px" }}>OTP</div>
                    <input type="number" placeholder='4 digit OTP' className='create-prop-form-input text-center' style={{ borderRadius: "0px 22px 22px 0px", width: "200px" }} max={9999} onChange={(e) => { setOtp(e.target.value) }} value={otp} />
                </div>
                <textarea name="" id="" className='decommission-reason-input' placeholder='Receiving officer remark...' onChange={(e) => { setRemark(e.target.value) }} value={remark} style={{ width: "350px", height: "60px" }} />
                <div className="day-or-night-receive">
                    <div className="radio-dayOrnight-button">
                        <input type="radio" id="day" name="boolean" onClick={() => { setDay(true) }} />
                        <label htmlFor="day">Day</label>
                    </div>
                    <div className="radio-dayOrnight-button">
                        <input type="radio" id="night" name="boolean" onClick={() => { setDay(false) }} />
                        <label htmlFor="night">Night</label>
                    </div>
                </div>
            </div>
            <div className="create-prop-form-button text-center hover-effect" onClick={handleSubmitEvent}>Receive</div>
        </div>
    )
}
