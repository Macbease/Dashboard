import React, { useState } from 'react';
import './dispatchProp.css';
import axios from 'axios';

export default function DispatchProp({ setActiveState }) {
    const [id, setId] = useState();
    const [otp, setOtp] = useState();
    const [day, setDay] = useState();

    function handleSubmitEvent() {
        if (!id || !otp) {
            return alert("Please provide sufficient information to dispatch a prop.");
        }
        const data = { propId: id, time: new Date(), otp: parseInt(otp), day: day };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/props/dispatchProp", data, config)
            .then((res) => {
                alert(res.data);
                if (res.data === "Prop has been successfully dispatched.") {
                    setActiveState("Home");
                }
                else {
                    return;
                }
            })
    }

    return (
        <div className='absolute-center-column'>
            <div className="create-prop-form-title text-center">
                <span class="material-symbols-outlined hover-effect" style={{ position: "absolute", left: "500px" }} onClick={() => { setActiveState("Home") }}>
                    arrow_back_ios
                </span>
                Prop Dispatch form
            </div>
            <div className='create-prop-form-container absolute-center-column'>
                <div className="create-prop-form-label text-center">Prop Id</div>
                <input type="text" placeholder='Enter the unique id of the prop...' className='create-prop-form-input text-center' value={id} onChange={(e) => { setId(e.target.value) }} />
                <div className="create-prop-form-label text-center">OTP</div>
                <input type="text" placeholder='Enter the otp of the booking...' className='create-prop-form-input text-center' value={otp} onChange={(e) => { setOtp(e.target.value) }} />
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
            <div className="create-prop-form-button text-center hover-effect" onClick={handleSubmitEvent}>Dispatch</div>
        </div>
    )
}
