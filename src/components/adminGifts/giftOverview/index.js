import React, { useLayoutEffect, useState } from 'react';
import './giftOverview.css';
import axios from "axios";
import UpdateGift from '../updateGift';
import GiftTemplate from './giftTemplate';
import DeleteGift from '../deleteGift';
import GiftText from './giftText';
import SetInLocker from './setInLocker';
import GiftDispatch from './giftDispatch';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from 'swiper';

export default function GiftOverview({ setActiveState }) {
    const [gifts, setGifts] = useState([{ name: "", image: "", price: "", discount: "", availability: "", }]);
    const [orders, setOrders] = useState([{ uid: "", text: "", receiverId: "", senderId: "", status: "", code: "", locker: "", reaction: "", productsAttached: "", productId: "", anonymous: "" }])
    const [updateState, setUpdateState] = useState(null);
    const [deleteState, setDeleteState] = useState(null);
    const [textState, setTextState] = useState(null);
    const [lockerState, setLockerState] = useState(null);
    const [dispatchState, setDispatchState] = useState(null);

    useLayoutEffect(() => {
        fetchAllGifts();
        fetchAllOrders();
    }, [updateState, deleteState, textState, lockerState, dispatchState]);

    //backend function to fetch all the gifts
    async function fetchAllGifts() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:5050/api/v1/gifts/getGifts", config)
            .then((res) => { setGifts(res.data) })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    //backend function to fetch all the orders
    async function fetchAllOrders() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:5050/api/v1/gifts/getOrdersAdmin", config)
            .then((res) => { setOrders(res.data) })
            .catch((err) => { console.log(err); alert(err.response.data) });
    }

    //function to display the correct content in the left container
    function getCorrectContentLeft() {
        if (updateState) {
            return <UpdateGift updateState={updateState} setUpdateState={setUpdateState} />
        }
        else if (deleteState) {
            return <DeleteGift deleteState={deleteState} setDeleteState={setDeleteState} />
        }
        else {
            return (
                <>
                    <div className="left-container-gift-overview-title">Gifts...</div>
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        slidesPerView={2.8}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        modules={[EffectCoverflow]}
                        style={{
                            width: "600px",
                            height: "400px",
                        }}
                    >
                        {gifts.map((item, index) => {
                            return (
                                <SwiperSlide>
                                    <div className="giftCard-container absolute-center-column">
                                        <div onClick={() => { setUpdateState(item) }}>
                                            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color)", "fontSize": "14px", position: "absolute", top: "80px", left: "20px" }}>
                                                edit
                                            </span>
                                        </div>
                                        <div onClick={() => { setDeleteState(item) }}>
                                            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color)", "fontSize": "14px", position: "absolute", top: "110px", left: "20px" }}>
                                                delete
                                            </span>
                                        </div>
                                        {item.availability && <div className="availableMark"></div>}
                                        <div className="giftCard-image-container">
                                            <img src={item.image} alt="" className='circular-image' />
                                        </div>
                                        <div className="giftCard-data-container absolute-center-column">
                                            <div className="giftCard-data-tab absolute-center">{item.name}</div>
                                            <div className="giftCard-data-tab absolute-center">{item.price}</div>
                                            <div className="giftCard-data-tab absolute-center">{item.discount}</div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </>
            )
        }
    }

    //function to display the correct content in the right container
    function getCorrectContentRight() {
        if (textState) {
            return (
                <GiftText textState={textState} setTextState={setTextState} />
            )
        }
        if (lockerState) {
            return (
                <SetInLocker lockerState={lockerState} setLockerState={setLockerState} />
            )
        }
        if (dispatchState) {
            return (
                <GiftDispatch dispatchState={dispatchState} setDispatchState={setDispatchState} />
            )
        }
        return (
            <>
                <div className="left-container-gift-overview-title absolute-center" style={{ marginTop: "12px" }}>Recent Orders...</div>
                <div className="recent-gift-orders-container">
                    {orders.map((item) => {
                        return (
                            <GiftTemplate item={item} setLockerState={setLockerState} setTextState={setTextState} setDispatchState={setDispatchState} />
                        )
                    })}
                </div>
            </>
        )
    }

    return (
        <div className='gift-overview-container absolute-center'>
            <div className="left-container-gift-overview absolute-center-column">
                {getCorrectContentLeft()}
            </div>
            <div className="right-container-gift-overview">
                {getCorrectContentRight()}
            </div>
        </div>
    )
}
