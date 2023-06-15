import React, { useState } from 'react';
import './createEvent.css';
import Profile from '../../../assets/img/default_oic.jpeg';
import axios from 'axios';

export default function CreateEvent({ setActiveState }) {

    const [name, setName] = useState();
    const [venue, setVenue] = useState();
    const [time, setTime] = useState();
    const [timeF, setTimeF] = useState();
    const [isDl, setIsDl] = useState(false);
    const [dlTime, setDlTime] = useState();
    const [isForm, setIsForm] = useState(false);
    const [formUrl, setFormUrl] = useState();

    const [posterFile, setPosterFile] = useState();
    const [posterUrl, setPosterUrl] = useState();
    const [posterPreview, setPosterPreview] = useState();

    const [temp, setTemp] = useState();
    const [tags, setTags] = useState([]);

    const [dataIsReady, setDataIsReady] = useState(false);

    const upload_icon =
        <div style={{ marginTop: "16px" }} onClick={xyz}>
            <span class="material-symbols-outlined hover-effect" style={{ "color": "var(--title-color-medium)", "fontSize": "30px" }}>
                cloud_upload
            </span>
        </div>

    const submit_icon = <div className="submit-new-event-button text-center hover-effect" onClick={handleSubmitEvent}>Submit</div>

    const dlTimeInput =
        <div className='dl-time-input-container absolute-center'>
            <input type="text" placeholder='Enter dl time...' className='hidden-input-styling' onChange={(e) => { setDlTime(e.target.value) }} />
            <div className="dl-time-input-container-right text-center">
                <span class="material-symbols-outlined hover-effect" style={{ color: "var(--title-color)", fontSize: "20px" }}>
                    done
                </span>
            </div>
        </div>

    const dlCheckBox =
        <div className='absolute-center'>
            <div className="event-dl-checkbox-text text-center">Is D.L. available?</div>
            <div className="event-dl-checkbox-input text-center">
                <input type="checkbox" className='event-dl-checkbox-style' onClick={() => { setIsDl(true) }} />
            </div>
        </div>

    const formUrlInput =
        <div className='dl-time-input-container absolute-center'>
            <input type="text" placeholder='Enter url of form...' className='hidden-input-styling' onChange={(e) => { setFormUrl(e.target.value) }} />
            <div className="dl-time-input-container-right text-center">
                <span class="material-symbols-outlined hover-effect" style={{ color: "var(--title-color)", fontSize: "20px" }}>
                    done
                </span>
            </div>
        </div>


    const formCheckBox =
        <div className='absolute-center'>
            <div className="event-dl-checkbox-text text-center">Is form available?</div>
            <div className="event-dl-checkbox-input text-center">
                <input type="checkbox" className='event-dl-checkbox-style' onClick={() => { setIsForm(true) }} />
            </div>
        </div>

    //function to get the url
    async function xyz() {
        if (!posterFile) {
            return alert("You must upload a poster for the event.");
        }
        const url = await uploadImage(posterFile);
        setPosterUrl(url);
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


    //function to validate the image
    async function validateImg(event, text) {
        const file = event.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size of image is 1Mb.")
        }
        else {
            setPosterFile(file);
            setPosterPreview(URL.createObjectURL(file));
        }
    }

    //function to push the tags
    function insertTag() {
        if (!temp) {
            return alert("Tag can't be empty.");
        }
        setTags((cur) => [temp, ...cur]);
        setTemp(null);
        return;
    }

    //submission event handler
    async function handleSubmitEvent() {
        if (!name || !venue || !time || !timeF || !posterUrl) {
            return alert("Insufficient data provided for the event.")
        }
        const data = { event: name, image: posterUrl, dateInWords: time, date: timeF, dlAvailable: isDl, dlTime: dlTime, place: venue, formAvail: isForm, participate: formUrl, tags: tags }
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        }
        axios.post("http://localhost:5050/api/v1/event/createEvent", data, config)
            .then((res) => {
                alert("Event Created!")
                setActiveState("View");
            })
    }


    return (
        <div className='absolute-center-column'>
            <div className="admin-club-container-title text-center">Event Form</div>
            <div className="create-club-form1-container absolute-center-column">
                <div className='absolute-center'>
                    <div className="admin-create-club-label-container text-center">Event Name</div>
                    <input type="text" className='admin-create-club-input-container' placeholder='Enter the name of the event...' autoFocus={true} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className='absolute-center'>
                    <div className="admin-create-club-label-container text-center">Venue</div>
                    <input type="text" className='admin-create-club-input-container' placeholder='Enter the venue of the event...' autoFocus={true} onChange={(e) => { setVenue(e.target.value) }} />
                </div>
                <div className='absolute-center'>
                    <div className="admin-create-club-label-container text-center">Time(in words)</div>
                    <input type="text" className='admin-create-club-input-container' placeholder='Enter the time of the event...' autoFocus={true} onChange={(e) => { setTime(e.target.value) }} />
                </div>
                <div className='absolute-center'>
                    <div className="admin-create-club-label-container text-center">Time(in format)</div>
                    <input type="datetime-local" className='admin-create-club-input-container' placeholder='Enter the name of the event...' autoFocus={true} onChange={(e) => { setTimeF(e.target.value) }} />
                </div>
                <div className='absolute-center' style={{ marginLeft: "22px" }}>
                    <div className="event-dl-checkbox-container ">
                        {isDl ? dlTimeInput : dlCheckBox}
                    </div>
                    <div className="event-dl-checkbox-container">
                        {isForm ? formUrlInput : formCheckBox}
                    </div>
                </div>
                <div className="absolute-center" style={{ marginTop: "20px" }}>
                    <div className='event-poster-uploadANDPreview-container absolute-center'>
                        <div className="event-poster-preview-container">
                            <img src={posterPreview || Profile} alt="" className='square-image' style={{ borderRadius: "22px 0px 0px 22px", objectFit: "fill" }} />
                        </div>
                        <div className="event-poster-upload-container text-center">
                            <label htmlFor="event-poster-upload">
                                <span class="material-symbols-outlined hover-effect" style={{ color: "var(--title-color)", fontSize: "30px" }}>
                                    add
                                </span>
                            </label>
                            <input type="file" id='event-poster-upload' hidden accept="image/png,image/jpeg" onChange={(event) => { validateImg(event) }} />
                        </div>
                    </div>
                    <div className="event-tags-uploadANDPreview-container absolute-center">
                        <div className="event-tags-preview-container">
                            {tags.map((item, index) => {
                                return (
                                    <div className="event-tag-preview-card text-center">{item}</div>
                                )
                            })}
                        </div>
                        <div className="event-tags-upload-container absolute-center-column">
                            <input type="text" className='event-tag-input' placeholder='Tags...' value={temp} onChange={(e) => { setTemp(e.target.value) }} />
                            <span class="material-symbols-outlined hover-effect" style={{ color: "var(--title-color)", fontSize: "30px" }} onClick={insertTag}>
                                done
                            </span>
                        </div>
                    </div>
                </div>
                {!dataIsReady ? upload_icon : submit_icon}
            </div>
        </div>
    )
}
