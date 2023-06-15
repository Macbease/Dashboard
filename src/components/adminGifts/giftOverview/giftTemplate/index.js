import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './giftTemplate.css';

export default function GiftTemplate({ item, setLockerState, setTextState, setDispatchState }) {
    const [giftImage, setGiftImage] = useState("");
    const [name, setName] = useState("");




    //backend function to fetch the right envelope image of the order
    async function getImage(id) {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = { id: id };
        axios.post("http://localhost:5050/api/v1/gifts/getGiftFromId", data, config)
            .then((res) => { setGiftImage(res.data.image); setName(res.data.name) })
            .catch((err) => { console.log(err); alert(err.response.data); })
    }

    function getCorrectStateOfOrder() {
        if (item.status === "vendor") {
            return (
                <div className='hover-effect' onClick={() => { setLockerState(item) }}>Set in locker</div>
            )
        }
        if (item.status === "lockerPending") {
            return (
                <>
                    <div className="order-indicator hover-effect" style={{ backgroundColor: "yellow" }} onClick={() => setDispatchState(item)}></div>
                </>
            )
        }
        if (item.status === "lockerAccepted") {
            return (
                <>
                    <div className="order-indicator hover-effect" style={{ backgroundColor: "green" }} onClick={() => setDispatchState(item)}></div>
                </>
            )
        }
        if (item.status === "lockerDeclined") {
            return (
                <>
                    <div className="order-indicator hover-effect" style={{ backgroundColor: "red" }} onClick={() => setDispatchState(item)}></div>
                </>
            )
        }
        if (item.status === "dispatched") {
            return (
                <>
                    <div className="order-indicator">
                        <span class="material-symbols-outlined hover-effect">
                            verified
                        </span>
                    </div>
                </>
            )
        }
    }


    useEffect(() => {
        getImage(item.giftId);
        console.log(item.status);
    }, [item]);

    return (
        <div className="gift-order-template absolute-center" style={{ justifyContent: "space-around" }}>
            <div>UID:{item.uid}</div>
            <div className='hover-effect' onClick={() => { setTextState(item.text) }}>Text</div>
            {getCorrectStateOfOrder()}

            <div style={{ width: "50px", height: "50px", borderRadius: "25px" }}><img src={giftImage} alt="" className='circular-image' /></div>
            <div>{name}</div>
            <div>
                {item.anonymous ?
                    <span class="material-symbols-outlined hover-effect">
                        visibility_off
                    </span> :
                    <span class="material-symbols-outlined hover-effect">
                        visibility
                    </span>

                }</div>
        </div>
    )


}
