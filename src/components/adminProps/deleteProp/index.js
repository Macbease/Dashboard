import React, { useState } from 'react';
import './deleteProp.css';
import axios from 'axios';

export default function DeleteProp({ setActiveState }) {
    const [id, setId] = useState();
    const [confirmId, setConfirmId] = useState();

    function handleSubmitEvent() {
        if (id !== confirmId || !id) {
            return alert("Id's do not match.Enter carefully.");
        }
        const data = { id };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/props/deleteProp", data, config)
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
                Prop Deletion form
            </div>
            <div className='create-prop-form-container absolute-center-column'>
                <div className="create-prop-form-label text-center">Prop Id</div>
                <input type="text" placeholder='Enter the unique id of the prop...' className='create-prop-form-input' onChange={(e) => { setId(e.target.value) }} value={id} />
                <div className="create-prop-form-label text-center"> Confirm Prop Id</div>
                <input type="text" placeholder='Re-enter the unique id of the prop...' className='create-prop-form-input' onChange={(e) => { setConfirmId(e.target.value) }} value={confirmId} onPaste={(e) => e.preventDefault()} />
            </div>
            <div className="create-prop-form-button text-center hover-effect" onClick={handleSubmitEvent}>Delete</div>
        </div>
    )
}
