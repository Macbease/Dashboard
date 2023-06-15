import axios from 'axios';
import React, { useState } from 'react';
import './eventAdder.css';
import ig1 from '../../../../assets/img/camera-illus.webp';
const generateUniqueId = require('generate-unique-id');

export default function EventAdder({ setFormState, clubId }) {
    const [name, setName] = useState();
    const [venue, setVenue] = useState();
    const [time, setTime] = useState();
    const [description, setDescription] = useState();
    const [con1Id, setCon1Id] = useState();
    const [con2Id, setCon2Id] = useState();

    const [dataIsReady, setDataIsReady] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [posterFile, setPosterFile] = useState();
    const [posterUrl, setPosterUrl] = useState();
    const [previewPoster, setPreviewPoster] = useState();

    const [con1File, setCon1File] = useState();
    const [con1Url, setCon1Url] = useState();
    const [previewCon1, setPreviewCon1] = useState();

    const [con2File, setCon2File] = useState();
    const [con2Url, setCon2Url] = useState();
    const [previewCon2, setPreviewCon2] = useState();

    const uploadSegment = <div onClick={handleUploadEvent}>
        <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "30px" }}>
            cloud_upload
        </span>
    </div>

    const submitSegment = <div className="final-event-submission-button-container text-center hover-effect" onClick={handleSubmitEvent}>Submit</div>

    const uploadingSegment = <div className="final-event-submission-button-container text-center hover-effect">Uploading</div>


    //function to handle submission form
    async function handleSubmitEvent() {
        console.log(clubId);
        let data = { id: generateUniqueId(), poster: posterUrl, name: name, description: description, venue: venue, time: time, contacts: [{ img: con1Url, contactId: con1Id }, { img: con2Url, contactId: con2Id }] }
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        const finalData = { "clubId": clubId, updateField: "upcomingEvent", data: data };
        axios.post("http://localhost:5050/api/v1/club/addToMultiplePointData", finalData, config)
            .then((res) => { console.log(res.data); alert("Done"); setFormState("Step4") })
    }

    //function to validate the image
    async function validateImg(event, text) {
        const file = event.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size of image is 1Mb.")
        }
        else {
            if (text === "con1") {
                setCon1File(file);
                setPreviewCon1(URL.createObjectURL(file));
            }
            if (text === "con2") {
                setCon2File(file);
                setPreviewCon2(URL.createObjectURL(file));
            }
            if (text === "poster") {
                setPosterFile(file);
                setPreviewPoster(URL.createObjectURL(file));
            }
        }
    }

    //function to upload the image on cloudinary
    async function handleUploadEvent() {
        console.log("fired");
        setUploadingImage(true);
        const poster = await uploadImage(posterFile);
        console.log("poster", poster);
        const con1 = await uploadImage(con1File);
        console.log("con1", con1);
        const con2 = await uploadImage(con2File);
        console.log("con2", con2);
        setPosterUrl(poster);
        setCon1Url(con1);
        setCon2Url(con2);
        setUploadingImage(false);
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
        <div className='create-club-form1-container absolute-center-column'>
            <div className="event-adder-title text-center">Event</div>
            <div className="event-adder-club-label-container text-center">Event Name</div>
            <input type="text" className='event-adder-club-input-container' placeholder='Enter the name of the event...' autoFocus={true} onChange={(e) => { setName(e.target.value) }} />
            <div className="event-adder-club-label-container text-center">Venue</div>
            <input type="text" className='event-adder-club-input-container' placeholder='Enter the venue of the event...' autoFocus={true} onChange={(e) => { setVenue(e.target.value) }} />
            <div className="event-adder-club-label-container text-center">Time</div>
            <input type="text" className='event-adder-club-input-container' placeholder='Enter the time of the event...' autoFocus={true} onChange={(e) => { setTime(e.target.value) }} />
            <div className="event-adder-club-label-container text-center">Description</div>
            <textarea className='admin-create-club-input-container' placeholder='Enter the motto of the event...' style={{ padding: "10px", height: "60px", width: "400px" }} onChange={(e) => { setDescription(e.target.value) }} />
            <div className="event-adder-image-container absolute-center">
                <div className="event-adder-image-box absolute-center">
                    <div className="event-adder-image-box-left">
                        <img src={previewPoster || ig1} alt="" className='square-image' style={{ borderRadius: "22px 0px 0px 22px", objectFit: "fill" }} />
                    </div>
                    <div className="event-adder-separator"></div>
                    <div className="event-adder-image-box-right absolute-center-column">
                        Poster
                        <label htmlFor="poster">
                            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "20px" }}>
                                add
                            </span>
                        </label>
                        <input type="file" id="poster" hidden accept="image/png,image/jpeg" onChange={(event) => { validateImg(event, "poster") }} />
                    </div>
                </div>
                <div className="event-adder-image-box absolute-center">
                    <div className="event-adder-image-box-left absolute-center-column">
                        <div className="contact-image">
                            <img src={previewCon1 || ig1} alt="" className='square-image' style={{ borderRadius: "22px 0px 0px 0px", objectFit: "fill" }} />
                        </div>
                        <div className="contact-id">
                            <input type="text" className='contact-id-input-container-for-event' placeholder='Contact-id' onChange={(e) => { setCon1Id(e.target.value) }} />
                        </div>
                    </div>
                    <div className="event-adder-separator"></div>
                    <div className="event-adder-image-box-right absolute-center-column">
                        Contact1
                        <label htmlFor="contact1">
                            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "20px" }}>
                                add
                            </span>
                        </label>
                        <input type="file" id="contact1" hidden accept="image/png,image/jpeg" onChange={(event) => { validateImg(event, "con1") }} />
                    </div>
                </div>
                <div className="event-adder-image-box absolute-center">
                    <div className="event-adder-image-box-left absolute-center-column">
                        <div className="contact-image">
                            <img src={previewCon2 || ig1} alt="" className='square-image' style={{ borderRadius: "22px 0px 0px 0px", objectFit: "fill" }} />
                        </div>
                        <div className="contact-id">
                            <input type="text" className='contact-id-input-container-for-event' placeholder='Contact-id' onChange={(e) => { setCon2Id(e.target.value) }} />
                        </div>
                    </div>
                    <div className="event-adder-separator"></div>
                    <div className="event-adder-image-box-right absolute-center-column">
                        Contact2
                        <label htmlFor="contact2">
                            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "20px" }}>
                                add
                            </span>
                        </label>
                        <input type="file" id="contact2" hidden accept="image/png,image/jpeg" onChange={(event) => { validateImg(event, "con2") }} />
                    </div>
                </div>
            </div>
            <div className="event-credentials-upload-container absolute-center">
                {!dataIsReady && !uploadingImage ? uploadSegment : submitSegment}
                {uploadingImage && uploadingSegment}
            </div>
        </div>
    )
}
