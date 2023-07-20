import React, { useState } from 'react';
import "./adminContent.css";
import Profile from '../../assets/img/default_oic.jpeg';
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from 'swiper';

export default function AdminContent() {

    const [active, setActive] = useState("create");
    const [data, setData] = useState([{
        "_id": "",
        "contentType": "",
        "url": " ",
        "text": "",
        "comments": [],
        "likes": [],
        "tags": [],
        "sendBy": "Macbease",
        "idOfSender": "",
        "useful": true,
        "timeStamp": "",
        "__v": 0
    }])

    const [contentType, setContentType] = useState(null);
    const [form, setForm] = useState(null);
    const [text, setText] = useState(null);

    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const [tag1, setTag1] = useState(null);
    const [tag2, setTag2] = useState(null);
    const [tag3, setTag3] = useState(null);


    const [belongsTo, setBelongsTo] = useState(null);
    const [belongsToSelected, setBelongsToSelected] = useState(null);
    const [usersList, setUsersList] = useState([{
        "_id": "",
        "name": "",
        "image": " "
    }])

    function handleDeleteEvent(id) {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = {
            "contentId": id,
            "adminId": "6425a242f71e05ba9d6d61bf"
        };
        axios.post("http://localhost:5050/api/v1/content/deleteContent", data, config)
            .then((res) => {
                alert(res.data);
            })

    }

    function getCorrectContent() {
        if (active === "create") {
            return (
                <div>
                    <div className="admin-club-container-title text-center">Create Content</div>
                    <div className="day-or-night-receive">
                        <div className="radio-dayOrnight-button">
                            <input type="radio" id="text" name="boolean" onClick={() => { setForm("text"); setContentType("text") }} />
                            <label htmlFor="text">Text</label>
                        </div>
                        <div className="radio-dayOrnight-button">
                            <input type="radio" id="image" name="boolean" onClick={() => { setForm("image"); setContentType("image") }} />
                            <label htmlFor="image">Image</label>
                        </div>
                        <div className="radio-dayOrnight-button" name="boolean" onClick={() => { setForm("video"); setContentType("video") }}>
                            <input type="radio" id="video" name="boolean" />
                            <label htmlFor="video">Video</label>
                        </div>
                    </div>
                    <div className="content-create-form">
                        {getContentForm()}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="admin-club-container-title text-center">Read content</div>
                    <div className="day-or-night-receive">
                        <div className="radio-dayOrnight-button" onClick={() => { handleGetEvent("today") }}>
                            <input type="radio" id="text" name="boolean" />
                            <label htmlFor="text">Today</label>
                        </div>
                        <div className="radio-dayOrnight-button" onClick={() => { handleGetEvent("week") }}>
                            <input type="radio" id="image" name="boolean" />
                            <label htmlFor="image">Week</label>
                        </div>
                        <div className="radio-dayOrnight-button" name="boolean" onClick={() => { handleGetEvent("all") }}>
                            <input type="radio" id="video" name="boolean" />
                            <label htmlFor="video">All</label>
                        </div>
                    </div>
                    <div className="content-create-form">
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
                                width: "1200px",
                                height: "280px"
                            }}
                        >
                            {data.map((item, index) => {
                                return (
                                    <SwiperSlide>
                                        <div className="content-card">
                                            <div className="content-card-top">
                                                <div className="content-card-top-left">
                                                    <img src={item.url} alt="" className='square-image-contain' style={{ borderRadius: "12px" }} />
                                                </div>
                                                <div className="content-card-top-right">
                                                    Likes {item.likes.length}
                                                    <div onClick={() => { handleDeleteEvent(item._id) }}>
                                                        <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color)", "fontSize": "14px", marginTop: "12px" }}>
                                                            delete
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="content-card-bottom">
                                                {item.text}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            )
        }
    }

    //function to validate the image
    async function validateImg(event) {
        const file = event.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size of image is 1Mb.")
        }
        else {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    }

    //function to upload the image 
    async function uploadImage(image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "yukw2rxf");
        try {
            let res = await fetch("https://api.cloudinary.com/v1_1/dq4iomrfv/image/upload", { method: "post", body: data });
            const urlData = await res.json();
            return urlData.url
        } catch (error) {
            console.log(error);
        }
    }

    async function handleImagePost() {
        if (!belongsToSelected) return alert("Select the contributor's profile!")
        const data = await uploadImage(logo);
        let finalData;
        if (tag1 !== "story") {
            finalData = {
                "contentType": "image",
                "sendBy": "Macbease",
                "text": text,
                "url": data,
                "tags": [tag1, tag2, tag3],
                "belongsTo": belongsToSelected,
                "key": "normal"
            };
        }
        else if (tag1 === "story" && tag3 === "firstPin") {
            localStorage.setItem("storyCreationTime", new Date());
            let storyCreationTime = localStorage.getItem("storyCreationTime");
            finalData = {
                "contentType": "image",
                "sendBy": "Macbease",
                "text": text,
                "url": data,
                "tags": [tag1, tag2, tag3],
                "belongsTo": belongsToSelected,
                "key": storyCreationTime
            };
        }
        else {
            let storyCreationTime = localStorage.getItem("storyCreationTime");
            finalData = {
                "contentType": "image",
                "sendBy": "Macbease",
                "text": text,
                "url": data,
                "tags": [tag1, tag2, tag3],
                "belongsTo": belongsToSelected,
                "key": storyCreationTime
            };
        }
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/content/createContent", finalData, config)
            .then((res) => {
                console.log("res")
                alert(res.data);
            })
    }

    async function handleTextPost() {
        console.log("fired");
        if (!belongsToSelected) return alert("Select the contributor's profile!")
        const finalData = {
            "contentType": "text",
            "sendBy": "Macbease",
            "text": text,
            "url": " ",
            "tags": [tag1, tag2, tag3],
            "belongsTo": belongsToSelected
        };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/content/createContent", finalData, config)
            .then((res) => {
                alert(res.data);
            })
    }


    function handleGetEvent(span) {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.get(`http://localhost:5050/api/v1/content/getContentBySpan?span=${span}`, config)
            .then((res) => {
                setData(res.data);
                alert("Data fetched successfully!");
            })
    }

    function getUsersList() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.get(`http://localhost:5050/api/v1/user/searchUserByName?name=${belongsTo}`, config)
            .then((res) => {
                setUsersList(res.data)
            })
    }

    function getContentForm() {
        switch (form) {
            case "text":
                return (
                    <div className="absolute-center-column">
                        <div className='content-form-container'>
                            <textarea name="" id="" className='text-content-input-box' placeholder='Enter the text content' onChange={(e) => setText(e.target.value)} value={text} />
                            <div className="absolute-center-column">
                                <div className='absolute-center'>
                                    <div className="admin-create-club-label-container text-center">#tag1</div>
                                    <input type="text" className='admin-create-club-input-container' placeholder='Enter tag1...' autoFocus={true} onChange={(e) => setTag1(e.target.value)} value={tag1} />
                                </div>
                                <div className='absolute-center'>
                                    <div className="admin-create-club-label-container text-center">#tag2</div>
                                    <input type="text" className='admin-create-club-input-container' placeholder='Enter tag2...' autoFocus={true} onChange={(e) => setTag2(e.target.value)} value={tag2} />
                                </div>
                                <div className='absolute-center'>
                                    <div className="admin-create-club-label-container text-center">#tag3</div>
                                    <input type="text" className='admin-create-club-input-container' placeholder='Enter tag3...' autoFocus={true} onChange={(e) => setTag3(e.target.value)} value={tag3} />
                                </div>
                            </div>
                        </div>
                        <div className="content-post-button">
                            <div className="content-post-button-actual hover-effect" onClick={() => { setForm("cancel") }}>Cancel</div>
                            <div className="content-post-button-actual hover-effect" onClick={() => {
                                if (!text || !tag1 || !tag2 || !tag3) return alert("Please fill out the form");
                                setForm("belongsTo")
                            }}>Post</div>
                        </div>
                    </div>
                )
            case "image":
                return (
                    <div className="absolute-center-column">
                        <div className='content-form-container'>
                            <textarea name="" id="" className='text-content-input-box' placeholder='Enter the text content' onChange={(e) => setText(e.target.value)} value={text} />
                            <div className="content-image-preview-container absolute-center" style={{ marginTop: "22px" }}>
                                <img src={logoPreview || Profile} alt="" className='square-image' style={{ borderRadius: "22px", objectFit: "contain", padding: "6px" }} />
                            </div>
                            <div className="absolute-center-column">
                                <div className='absolute-center'>
                                    <div className="admin-create-club-label-container text-center">#tag1</div>
                                    <input type="text" className='admin-create-club-input-container' placeholder='Enter tag1...' autoFocus={true} onChange={(e) => setTag1(e.target.value)} value={tag1} />
                                </div>
                                <div className='absolute-center'>
                                    <div className="admin-create-club-label-container text-center">#tag2</div>
                                    <input type="text" className='admin-create-club-input-container' placeholder='Enter tag2...' autoFocus={true} onChange={(e) => setTag2(e.target.value)} value={tag2} />
                                </div>
                                <div className='absolute-center'>
                                    <div className="admin-create-club-label-container text-center">#tag3</div>
                                    <input type="text" className='admin-create-club-input-container' placeholder='Enter tag3...' autoFocus={true} onChange={(e) => setTag3(e.target.value)} value={tag3} />
                                </div>
                            </div>
                        </div >
                        <div className="content-post-button">
                            <div className="content-post-button-actual hover-effect" onClick={() => { setForm("cancel") }}>Cancel</div>
                            <div className="content-post-button-actual hover-effect" onClick={() => {
                                if (!logo || !text || !tag1 || !tag2 || !tag3) return alert("Please fill out the form");
                                setForm("belongsTo")
                            }}>Post</div>
                            <div className="content-post-button-actual hover-effect">
                                <label htmlFor="image-upload-club-logo">
                                    <span class="material-symbols-outlined hover-effect" style={{ color: "var(--title-color)" }}>
                                        cloud_upload
                                    </span>
                                </label>
                                <input type="file" id="image-upload-club-logo" hidden accept='image/png,image/jpeg' onChange={(event) => { validateImg(event) }} />
                            </div>
                        </div>
                    </div>
                )
            case "video":
                return (
                    <div className="still-coming-title">This feature will be coming soon...</div>
                )
            case "belongsTo":
                return (
                    <div className='belongsToContainer'>
                        <div className="belongsToLeft">
                            <input type="text" className='admin-create-club-input-container' placeholder='Enter contributor name...' autoFocus={true} onChange={(e) => setBelongsTo(e.target.value)} value={belongsTo} />
                            <div className='belongsToSearchBtn hover-effect' onClick={() => { getUsersList() }}>Search</div>
                        </div>
                        <div className="belongsToRight">
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
                                    width: "800px",
                                    height: "180px",
                                }}
                            >
                                {usersList.map((item, index) => {
                                    return (
                                        <SwiperSlide>
                                            <div className="belongsToCard">
                                                <div className="belongsToCardLeft">
                                                    <img src={item.image} alt="" className='belongs-to-img' />
                                                </div>
                                                <div className="belongsToCardRight">
                                                    <div>{item.name}</div>
                                                    <div className="hover-effect select-btn" onClick={() => { setBelongsToSelected(item._id) }}>Select</div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", height: "40px" }}>
                                <div className="content-post-button-actual hover-effect" onClick={() => { setForm("cancel") }}>Cancel</div>
                                <div className="content-post-button-actual hover-effect" onClick={() => {
                                    if (contentType === "text") {
                                        handleTextPost()
                                    }
                                    else if (contentType === "image") {
                                        handleImagePost()
                                    }
                                }}>Post</div>
                            </div>
                        </div>
                    </div>
                )
            default:
                return
        }
    }

    return (
        <div className='admin-club-container'>
            {getCorrectContent()}
            <div className="props-overview-controls absolute-center" style={{ justifyContent: "space-around", marginTop: "80px" }}>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActive("create") }}>Create content</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActive("view") }}>Read content</div>
            </div>
        </div>
    )
}
