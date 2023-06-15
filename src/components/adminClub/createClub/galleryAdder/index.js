import React, { useState } from 'react';
import './galleryAdder.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from 'swiper';
import axios from 'axios';
const generateUniqueId = require('generate-unique-id');

export default function GalleryAdder({ setFormState, clubId, workSpace }) {
    const [urls, setUrls] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [files, setFiles] = useState([]);

    const [dataIsReady, setDataIsReady] = useState(false);

    //function to validate the image
    async function validateImg(event) {
        const file = event.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size of image is 1Mb.")
        }
        else {
            setFiles((cur) => [file, ...cur]);
            setPreviews((cur) => [URL.createObjectURL(file), ...cur]);
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

    //function to map the files
    async function xyz() {
        await files.map((item) => {
            uploadImage(item).then((res) => {
                setUrls((cur) => [{ url: res, id: generateUniqueId() }, ...cur]);
            });
        })
        setDataIsReady(true);
    }


    //function
    async function handleSubmitEvent() {
        let data = {};
        if (!workSpace) {
            data = { "clubId": clubId, updateField: "gallery", data: urls };
        }
        if (workSpace) {
            data = { "clubId": clubId, updateField: "workSpacePhotos", data: urls };
        }
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        if (!workSpace) {
            axios.post("http://localhost:5050/api/v1/club/addToMultiplePointData", data, config)
                .then((res) => { alert("Gallery updated!"); setFormState("Step3"); })
        }
        if (workSpace) {
            axios.post("http://localhost:5050/api/v1/club/addToMultiplePointData", data, config)
                .then((res) => { alert("WorkSpace updated!"); setFormState("Step1"); })
        }
    }



    const upload_icon =
        <div className="upload_image_icon_container" onClick={xyz}>
            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "40px" }}>
                cloud_upload
            </span>
        </div>

    const submit_icon = <div className="final-submission-button-container text-center hover-effect" onClick={handleSubmitEvent}>Submit</div>

    return (
        <div className='create-club-form1-container'>
            <div className="gallery-preview-title text-center">{workSpace ? "WorkSpace" : "Gallery"}</div>
            <div className="gallery-preview-carousel">
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    slidesPerView={3}
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
                        height: "200px",
                        borderRadius: "13px 0px 0px 13px",
                        marginTop: "50px"
                    }}
                >
                    {previews.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="gallery_preview_card">
                                    <img src={item} alt="" className='square-image' style={{ borderRadius: "22px" }} />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className="add_image_icon_container">
                    <label htmlFor="club_gallery_photo">
                        <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "40px" }}>
                            add
                        </span>
                    </label>
                    <input type="file" id="club_gallery_photo" hidden accept='image/png,image/jpeg' onChange={(event) => { validateImg(event) }} />
                </div>
            </div>
            {dataIsReady ? submit_icon : upload_icon}
        </div>
    )
}
