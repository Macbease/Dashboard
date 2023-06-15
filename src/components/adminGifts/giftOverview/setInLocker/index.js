import React, { useEffect, useState } from 'react';
import './setInLocker.css';
import axios from 'axios';

export default function SetInLocker({ lockerState, setLockerState }) {
    const [lockerId, setLockerId] = useState(null);
    const [code, setCode] = useState(null);
    const [giftImage, setGiftImage] = useState("");
    const [vendorProduct, setVendorProduct] = useState("");

    //backend function to fetch the right envelope image of the order
    async function getImage(id) {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = { id: id };
        axios.post("http://localhost:5050/api/v1/gifts/getGiftFromId", data, config)
            .then((res) => { setGiftImage(res.data.image); })
            .catch((err) => { console.log(err); alert(err.response.data); })
    }

    //backend function to fetch the right vendor gift image of the order
    async function getProductImage(productID) {
        let data = { productID };
        axios.post("http://localhost:5050/api/v1/frontend/getProductById", data)
            .then((res) => { setVendorProduct(res.data.cover) })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    //backend function to set the locker id and the code
    async function handleSubmissionEvent() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = {
            senderId: lockerState.senderId,
            receiverId: lockerState.receiverId,
            uid: lockerState.uid,
            locker: lockerId,
            code: code
        };
        axios.post("http://localhost:5050/api/v1/gifts/setGiftInLocker", data, config)
            .then((res) => { alert(res.data); })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    useEffect(() => {
        getImage(lockerState.giftId);
        getProductImage(lockerState.productId);
    }, [lockerState])


    return (
        <div className='gift-text-container absolute-center-column'>
            <div className='goBackToTemplate'>
                <span class="material-symbols-outlined hover-effect" onClick={() => { setLockerState(null) }}>
                    arrow_back_ios
                </span>
            </div>
            <div className="gift-text-title">Set in Locker</div>
            <div className="gift-preview-images-container absolute-center-column" >
                <div className="gift-preview-image">
                    <img src={giftImage} alt="" className='circular-image' />
                </div>
                <div className="gift-preview-image">
                    <img src={vendorProduct} alt="" className='circular-image' />
                </div>
            </div>
            <div className="gift-text-message absolute-center-column">
                <div className="create-prop-form-label text-center" >Locker-Id</div>
                <input type="text" placeholder='Enter the locker id assigned...' className='create-prop-form-input' onChange={(e) => { setLockerId(e.target.value) }} value={lockerId} />
                <div className="create-prop-form-label text-center">Code</div>
                <input type="text" placeholder='Enter the code assigned...' className='create-prop-form-input' onChange={(e) => { setCode(e.target.value) }} value={code} />
                <div className="create-prop-form-button text-center hover-effect" style={{ marginTop: "18px" }} onClick={handleSubmissionEvent}>Set</div>
            </div>
        </div>
    )
}
