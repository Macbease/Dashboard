import React, { useState } from 'react';
import './decomissionProp.css';
import axios from 'axios';

export default function DecommissionProps({ setActiveState }) {
    const [id, setId] = useState();
    const [reason, setReason] = useState();

    function handleSubmitEvent() {
        if (!id || !reason) {
            return alert("You must provide valid prop id and reason.");
        }
        const data = { id, reason };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/props/decommissionProp", data, config)
            .then((res) => {
                alert("Prop was successfully decommissioned.");
                setActiveState("Home");
            })
    }

    return (
        <div className='absolute-center-column'>
            <div className="create-prop-form-title text-center">
                <span class="material-symbols-outlined hover-effect" style={{ position: "absolute", left: "500px" }} onClick={() => { setActiveState("Home") }}>
                    arrow_back_ios
                </span>
                Prop Decommission form
            </div>
            <div className='create-prop-form-container absolute-center-column'>
                <div className="create-prop-form-label text-center">Prop Id</div>
                <input type="text" placeholder='Enter the unique id of the prop...' className='create-prop-form-input' onChange={(e) => setId(e.target.value)} value={id} />
                <div className="create-prop-form-label text-center">Reason</div>
                <textarea name="" id="" className='decommission-reason-input' placeholder='Enter the reason for decommissioning.' onChange={(e) => setReason(e.target.value)} value={reason} />
            </div>
            <div className="create-prop-form-button text-center hover-effect" onClick={handleSubmitEvent}>Decommission</div>
        </div>
    )
}
