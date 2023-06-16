import React, { useState } from 'react';
import './createProp.css';
import axios from 'axios';
import { url } from "../../../assets/constants/data";

export default function CreateProp({ setActiveState }) {
    const [name, setName] = useState();
    const [id, setId] = useState();

    function handleSubmitEvent() {
        const data = { name, id };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/props/registerProp", data, config)
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
                Prop Creation form
            </div>
            <div className='create-prop-form-container absolute-center-column'>
                <div className="create-prop-form-label text-center">Name</div>
                <input type="text" placeholder='Enter the name of the prop...' className='create-prop-form-input' onChange={(e) => { setName(e.target.value) }} value={name} />
                <div className="create-prop-form-label text-center">Prop Id</div>
                <input type="text" placeholder='Enter the unique id of the prop...' className='create-prop-form-input' onChange={(e) => { setId(e.target.value) }} value={id} />
            </div>
            <div className="create-prop-form-button text-center hover-effect" onClick={handleSubmitEvent}>Create</div>
        </div>
    )
}
