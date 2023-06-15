import React, { useState } from 'react';
import Profile from '../../../../assets/img/default_oic.jpeg';
import axios from 'axios';
import './formA.css';

export default function FormA({ setFormState, setClubId }) {
    //data states
    const [name, setName] = useState();
    const [motto, setMotto] = useState();
    const [msg, setMsg] = useState();
    const [logoUrl, setLogoUrl] = useState();
    const [chiefUrl, setChiefUrl] = useState();
    const [dataIsReady, setDataIsReady] = useState(false);

    //logo image states
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    //chiefImg states
    const [chiefImg, setChiefImg] = useState(null);
    const [chiefImgPreview, setChiefImgPreview] = useState(null);

    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingForm, setUploadingForm] = useState(false);

    //function to validate the image
    async function validateImg(event, text) {
        const file = event.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size of image is 1Mb.")
        }
        else {
            if (text === "logo") {
                setLogo(file);
                setLogoPreview(URL.createObjectURL(file));
            }
            if (text === "chiefImg") {
                setChiefImg(file);
                setChiefImgPreview(URL.createObjectURL(file));
            }
        }
    }

    //function to host the image on cloudinary and get the url
    async function uploadImage(image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "yukw2rxf");
        try {
            setUploadingImage(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/dq4iomrfv/image/upload", { method: "post", body: data });
            const urlData = await res.json();
            setUploadingImage(false);
            return urlData.url
        } catch (error) {
            setUploadingImage(false);
            setUploadingForm(false);
            console.log(error);
        }
    }

    async function setUrlOfImages() {
        const urlOfLogo = await uploadImage(logo);
        const urlOfChief = await uploadImage(chiefImg);
        setLogoUrl(urlOfLogo);
        setChiefUrl(urlOfChief);
        setDataIsReady(true);
    }

    //function for form 1 submission
    async function handleForm1Submission() {
        setUploadingForm(true);
        if (!logoUrl || !chiefUrl || !name || !motto || !msg) return alert("Please upload the required images of the club.")
        const data = { name: name, motto: motto, featuringImg: logoUrl, chiefImage: chiefUrl, chiefMsg: msg };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        }
        axios.post("http://localhost:5050/api/v1/club/createClub", data, config)
            .then((res) => {
                setClubId(res.data.club._id);
                alert("Club form A submitted!");
                setUploadingForm(false);
                setFormState("Step2");
            })

    }

    return (
        <div>
            <div className="create-club-form1-container absolute-center-column">
                <div className="admin-create-club-label-container text-center">Club Name</div>
                <input type="text" className='admin-create-club-input-container' placeholder='Enter the name of club...' autoFocus={true} onChange={(e) => { setName(e.target.value) }} />
                <div className="admin-create-club-label-container text-center">Club Motto</div>
                <textarea className='admin-create-club-input-container' placeholder='Enter the motto of club...' style={{ padding: "10px", height: "60px", width: "400px" }} onChange={(e) => { setMotto(e.target.value) }} />
                <div className="admin-create-club-label-container text-center">Chief message</div>
                <textarea className='admin-create-club-input-container' placeholder='Enter the message of the chief...' style={{ padding: "10px", height: "60px", width: "400px" }} onChange={(e) => { setMsg(e.target.value) }} />
                <div className="admin-create-club-label-container text-center">Logo and Chief</div>
                <div className="admin-create-club-image-container absolute-center">
                    <div className="admin-create-club-image absolute-center">
                        <div className="admin-create-club-image-preview">
                            <img src={logoPreview || Profile} alt="" className='square-image' style={{ borderRadius: "22px" }} />
                        </div>
                        <div className="admin-create-club-image-add">
                            <label htmlFor="image-upload-club-logo">
                                <span class="material-symbols-outlined hover-effect" style={{ color: "var(--title-color)", marginTop: "35px" }}>
                                    cloud_upload
                                </span>
                            </label>
                            <input type="file" id="image-upload-club-logo" hidden accept='image/png,image/jpeg' onChange={(event) => { validateImg(event, "logo") }} />
                        </div>
                    </div>
                    <div className="admin-create-club-image absolute-center">
                        <div className="admin-create-club-image-preview">
                            <img src={chiefImgPreview || Profile} alt="" className='square-image' style={{ borderRadius: "22px" }} />
                        </div>
                        <div className="admin-create-club-image-add">
                            <label htmlFor="image-upload-club-chiefImg">
                                <span class="material-symbols-outlined hover-effect" style={{ color: "var(--title-color)", marginTop: "35px" }}>
                                    cloud_upload
                                </span>
                            </label>
                            <input type="file" id="image-upload-club-chiefImg" hidden accept='image/png,image/jpeg' onChange={(event) => { validateImg(event, "chiefImg") }} />
                        </div>
                    </div>
                </div>
                <div className="absolute-center">
                    {!dataIsReady && <div className="form1-submit-button text-center hover-effect" onClick={setUrlOfImages}>{uploadingImage ? "Uploading..." : "Upload image"}</div>}
                    {dataIsReady && <div className="form1-submit-button text-center hover-effect" onClick={handleForm1Submission}>{uploadingForm ? "Uploading..." : "Submit"}</div>}
                </div>
            </div>
        </div>
    )
}
