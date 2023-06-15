import React, { useState } from 'react';
import './featuring.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from 'swiper';
import axios from 'axios';
const generateUniqueId = require('generate-unique-id');


export default function Featuring({ clubId, setFormState }) {
    const [urls, setUrls] = useState([]);
    const [imgPreviews, setImgPreviews] = useState([]);
    const [files, setFiles] = useState([]);

    const [msg, setMsg] = useState([]);
    const [ids, setIds] = useState([]);
    const [temp1, setTemp1] = useState();
    const [temp2, setTemp2] = useState();

    const [dataIsReady, setDataIsReady] = useState(false);

    const upload_icon =
        <div onClick={xyz}>
            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "30px" }}>
                cloud_upload
            </span>
        </div>

    const submit_icon = <div className="featuring-data-submit-btn text-center hover-effect" onClick={handleSubmitEvent}>Submit</div>

    //function to handle submit event
    async function handleSubmitEvent() {
        let featuring = [];
        urls.map((item, index) => {
            featuring[index] = { id: generateUniqueId(), image: item, msg: msg[index], contactId: ids[index] };
        });
        let data = { "clubId": clubId, updateField: "featuringMember", data: featuring };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/club/addToMultiplePointData", data, config)
            .then((res) => { alert("Featuring column updated!"); setFormState("Step6") })
    }

    //function to validate the image
    async function validateImg(event) {
        const file = event.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size of image is 1Mb.")
        }
        else {
            setFiles((cur) => [...cur, file]);
            setImgPreviews((cur) => [URL.createObjectURL(file), ...cur]);
        }
    }

    //function to validate the contact id
    async function validateContactId(event) {
        if (!temp1) {
            return alert("Contact id can't be empty.");
        }
        else {
            setIds((cur) => [temp1, ...cur]);
            setTemp1(null);
        }
    }

    //function to validate the message
    async function validateMessage(event) {
        if (!temp2) {
            return alert("Message can't be empty.");
        }
        else {
            setMsg((cur) => [temp2, ...cur]);
            setTemp2(null);
        }
    }

    //function to get the urls
    async function xyz() {
        await files.map((item) => {
            uploadImage(item).then((res) => {
                setUrls((cur) => [res, ...cur])
            })
        })
        setDataIsReady(true);
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

    return (
        <div className='create-club-form1-container'>
            <div className="gallery-preview-title text-center">
                Featuring
            </div>
            <div className="gallery-preview-carousel" style={{ height: "450px" }}>
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    slidesPerView={1.5}
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
                        width: "100%",
                        height: "250px",
                        borderRadius: "13px 0px 0px 13px",
                        marginTop: "20px"
                    }}
                >
                    {imgPreviews.map((item, index) => {
                        return (
                            <SwiperSlide>
                                <div className="featuring-card-container absolute-center">
                                    <div className="featuring-card-container-left absolute-center-column">
                                        <div className="featuring-card-container-left-top">
                                            <img src={item} alt="" className='square-image' style={{ borderRadius: " 22px 0px 0px 0px" }} />
                                        </div>
                                        <div className="featuring-card-container-left-bottom text-center">
                                            Id:
                                            {ids.length < imgPreviews.length ? index === 0 ? "Not defined" : ids[index - 1] : ids[index]}
                                        </div>
                                    </div>
                                    <div className="featuring-card-container-right text-center">
                                        {msg.length < imgPreviews.length ? index === 0 ? "Not defined" : msg[index - 1] : msg[index]}
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className="featuring-add-details-container absolute-center">
                    <div className="featuring-add-details-container-left absolute-center-column">
                        <div className="featuring-add-details-container-left-top absolute-center">
                            <label htmlFor="featuring-member-label">
                                <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "40px" }}>
                                    add
                                </span>
                            </label>
                            <input type="file" id="featuring-member-label" hidden accept='image/png,image/jpeg' onChange={(event) => { validateImg(event) }} />
                        </div>
                        <div className="featuring-add-details-container-left-middle text-center">Enter contact id</div>
                        <div className="featuring-add-details-container-left-bottom absolute-center-column">
                            <input type="text" className='featuring-mem-id-input' placeholder='Id...' onChange={(e) => { setTemp1(e.target.value) }} value={temp1} />
                            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)" }} onClick={validateContactId}>
                                done
                            </span>
                        </div>
                    </div>
                    <div className="featuring-add-details-container-right">
                        <textarea placeholder='Enter the message...' className='featuring-message-input-container absolute-center' onChange={(e) => { setTemp2(e.target.value) }} value={temp2} />
                        <div className="upload-featuring-msg-button absolute-center">
                            <button className='upload-featuring-msg-button-style hover-effect' onClick={validateMessage}>Upload message</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="upload-OR-submit-Container text-center">
                {dataIsReady ? submit_icon : upload_icon}
            </div>
        </div>
    )
}
