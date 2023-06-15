import React, { useState } from 'react';
import './teamAdder.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from 'swiper';
import axios from 'axios';
const generateUniqueId = require('generate-unique-id');

export default function TeamAdder({ clubId, setFormState }) {
    const [urls, setUrls] = useState([]);
    const [imgPreviews, setImgPreviews] = useState([]);
    const [files, setFiles] = useState([]);

    const [ids, setIds] = useState([]);
    const [pos, setPos] = useState([]);
    const [temp1, setTemp1] = useState();
    const [temp2, setTemp2] = useState();
    const [dataIsReady, setDataIsReady] = useState(false);

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

    //function to handle submit event
    async function handleSubmitEvent() {
        let team = [];
        urls.map((item, index) => {
            team[index] = { id: generateUniqueId(), image: item, pos: pos[index], contactId: ids[index] }
        });
        let data = { "clubId": clubId, updateField: "team", data: team };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/club/addToMultiplePointData", data, config)
            .then((res) => { alert("Team updated!"); setFormState("Step5") })

    }

    const upload_icon =
        <div className="upload_image_icon_container" onClick={xyz}>
            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "40px" }}>
                cloud_upload
            </span>
        </div>

    const submit_icon = <div className="final-submission-button-container text-center hover-effect" onClick={handleSubmitEvent}>Submit</div>

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

    //function to validate the position
    async function validatePosition(event) {
        if (!temp2) {
            return alert("Contact id can't be empty.");
        }
        else {
            setPos((cur) => [temp2, ...cur]);
            setTemp2(null);
        }
    }

    return (
        <div className='create-club-form1-container'>
            <div className="gallery-preview-title text-center">Team</div>
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
                        height: "250px",
                        borderRadius: "13px 0px 0px 13px",
                        marginTop: "20px"
                    }}
                >
                    {imgPreviews.map((item, index) => {
                        return (
                            <SwiperSlide key={index} className="absolute-center-column">
                                <div className="gallery_preview_card">
                                    <img src={item} alt="" className='square-image' style={{ borderRadius: "22px" }} />
                                </div>
                                <div className="contact-id-team-container text-center">Id:  {ids.length < imgPreviews.length ? index === 0 ? "Not defined" : ids[index - 1] : ids[index]}</div>
                                <div className="contact-id-team-container text-center">Pos:  {pos.length < imgPreviews.length ? index === 0 ? "Not defined" : pos[index - 1] : pos[index]}</div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className='absolute-center' style={{ justifyContent: "space-around", marginTop: "20px" }}>
                    <div className="add_image_of_team_icon_container">
                        <label htmlFor="team-adder-label">
                            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "40px" }}>
                                add
                            </span>
                        </label>
                        <input type="file" id="team-adder-label" hidden accept='image/png,image/jpeg' onChange={(event) => { validateImg(event) }} />
                    </div>
                    <div className="add_contact_id_of_team_container absolute-center">
                        <input type="text" className='add_contact_id_of_team_input' placeholder='Enter contact id...' onChange={(e) => { setTemp1(e.target.value) }} value={temp1} />
                        <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)" }} onClick={validateContactId}>
                            done
                        </span>
                    </div>
                    <div className="add_contact_id_of_team_container absolute-center">
                        <input type="text" className='add_contact_id_of_team_input' placeholder='Enter position...' onChange={(e) => { setTemp2(e.target.value) }} value={temp2} />
                        <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)" }} onClick={validatePosition}>
                            done
                        </span>
                    </div>
                </div>
            </div>
            {dataIsReady ? submit_icon : upload_icon}
        </div>
    )
}
