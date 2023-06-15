import React from 'react';
import './deleteGift.css';
import axios from 'axios';

export default function DeleteGift({ deleteState, setDeleteState }) {

    //backend function to delete the gifts
    async function handleDeletionEvent() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = { giftId: deleteState._id };
        axios.post("http://localhost:5050/api/v1/gifts/deleteGift", data, config)
            .then((res) => { alert(res.data); })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    return (
        <div className='absolute-center-column'>
            <div className="create-prop-form-title text-center" style={{ marginTop: "0px" }}>
                <span class="material-symbols-outlined hover-effect" style={{ position: "absolute", left: "150px" }} onClick={() => { setDeleteState(null) }}>
                    arrow_back_ios
                </span>
                Gift Deletion Form
            </div>
            <div className='create-gift-form-container absolute-center-column' style={{ width: "550px" }}>
                <div className='delete-gift-image-container'><img src={deleteState.image} alt="" className='circular-image' /></div>
                <div className='delete-gift-name'>{deleteState.name}</div>
                <div className="delete-gift-message">Do you really want to delete?</div>
                <div className="delete-gift-buttons absolute-center" style={{ justifyContent: "space-around" }}>
                    <div className="delete-gift-button hover-effect absolute-center" onClick={handleDeletionEvent}>Yes</div>
                    <div className="delete-gift-button hover-effect absolute-center" onClick={() => { setDeleteState(null) }}>Cancel</div>
                </div>
            </div>
        </div>
    )
}
