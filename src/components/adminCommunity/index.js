import React, { useState, useEffect } from 'react';
import "./adminCommunity.css";
import axios from 'axios';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from 'swiper';


export default function AdminCommunity() {
    const [tiles, setTiles] = useState([{ _id: "", name: "", image: "" }]);
    const [tags, setTags] = useState([""]);
    const [active, setActive] = useState("overView");
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);

    function getCorrectContent() {
        switch (active) {
            case "overView":
                return (
                    <>
                        <div className="tile-featuring absolute-center">
                            <div className='tile-title'>Tiles that are featuring...</div>
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
                                className="mySwiper"
                                style={{
                                    width: "600px",
                                    height: "250px",
                                }}
                            >
                                {tiles.map((item, index) => {
                                    return (
                                        <SwiperSlide>
                                            <div className="tile-card">
                                                <div onClick={() => { handleDeleteEvent(item._id) }}>
                                                    <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color)", "fontSize": "14px", position: "absolute", top: "10px", left: "20px" }}>
                                                        delete
                                                    </span>
                                                </div>
                                                <img src={item.image} alt="" className='tile-image' />
                                                <div className='tile-text'>{item.name}</div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                        <div className="tag-featuring">
                            <div className='tile-title'>Tags that are featuring...</div>
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
                                className="mySwiper"
                                style={{
                                    width: "600px",
                                    height: "200px",
                                }}
                            >
                                {tags.map((item, index) => {
                                    return (
                                        <SwiperSlide>
                                            <div className="tag-card">
                                                <div className='tile-text'>{item}</div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            <div className="create-tile-button" onClick={() => { setActive("create"); console.log("pressed") }}>Create</div>
                        </div>
                    </>
                )
            case "create":
                return (
                    <div className='absolute-center-column'>
                        <div className="create-prop-form-title text-center">
                            <span class="material-symbols-outlined hover-effect" style={{ position: "absolute", left: "500px" }} onClick={() => { setActive("overView") }}>
                                arrow_back_ios
                            </span>
                            Tile Creation form
                        </div>
                        <div className='create-prop-form-container absolute-center-column'>
                            <div className="create-prop-form-label text-center">Name</div>
                            <input type="text" placeholder='Enter the name of the tile...' className='create-prop-form-input' onChange={(e) => { setName(e.target.value) }} value={name} />
                            <div className="create-prop-form-label text-center">Image Url</div>
                            <input type="text" placeholder='Enter the image url of tile...' className='create-prop-form-input' onChange={(e) => { setImage(e.target.value) }} value={image} />
                        </div>
                        <div className="create-prop-form-button text-center hover-effect" onClick={() => { handleCreationEvent() }}>Create</div>
                    </div>
                )
            default:
                break;
        }
    }

    function openUpData(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            arr.push(...data[i].tag);
        }
        return arr
    }

    function fetchTiles() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:5050/api/v1/tile/getTiles", config)
            .then((res) => {
                setTiles(res.data);
                console.log(res.data);
            })
    }

    function fetchAllTags() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:5050/api/v1/community/getAllTags", config)
            .then((res) => {
                let data = openUpData(res.data)
                console.log(data)
                setTags(data)
            })
    }

    function handleCreationEvent() {
        if (!name || !image) {
            return alert("Fill out the form!")
        }
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = { name, image };
        axios.post("http://localhost:5050/api/v1/tile/createTile", data, config)
            .then((res) => {
                alert("Done");
                setActive("overView");
            })
    }

    function handleDeleteEvent(id) {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = { tileId: id };
        axios.post("http://localhost:5050/api/v1/tile/deleteTile", data, config)
            .then((res) => {
                alert(res.data);
            })
    }

    useEffect(() => {
        fetchTiles()
        fetchAllTags()
    }, [handleDeleteEvent, handleCreationEvent])

    return (
        <div className='tile-container'>
            {getCorrectContent()}
        </div>
    )
}
