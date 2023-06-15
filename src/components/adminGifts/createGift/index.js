import React, { useState } from 'react';
import './createGift.css';
import axios from "axios";
import img from "../../../assets/img/gift_icon-removebg-preview.png";

export default function CreateGift({ setActiveState }) {
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [price, setPrice] = useState(null);
    const [discount, setDiscount] = useState(null);

    //function to validate the image
    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1 Mb!");
        }
        else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    //function to host the image on the cloudinary
    async function uploadImage(image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "yukw2rxf");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/dq4iomrfv/image/upload", { method: "post", body: data });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    //function to handle submit event
    async function handleSubmitEvent() {
        if (!name || !image || !price || !discount) return alert("Please fill out all the details.");
        const url = await uploadImage(image);
        let data = { name, image: url, price, discount };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        }
        axios.post("http://localhost:5050/api/v1/gifts/createGift", data, config)
            .then((res) => { return alert("Gift has been successfully created.") })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }
    return (
        <div className='absolute-center-column'>
            <div className="create-prop-form-title text-center" style={{ marginTop: "0px" }}>
                <span class="material-symbols-outlined hover-effect" style={{ position: "absolute", left: "500px" }} onClick={() => { setActiveState("home") }}>
                    arrow_back_ios
                </span>
                Gift Creation Form
            </div>
            <div className='create-gift-form-container'>
                <div className='absolute-center-column'>
                    <div className="create-prop-form-label text-center">Name</div>
                    <input type="text" placeholder='Enter the name of the gift...' className='create-prop-form-input' onChange={(e) => { setName(e.target.value) }} value={name} />
                    <div className="create-prop-form-label text-center">Price</div>
                    <input type="text" placeholder='Enter the price of the gift...' className='create-prop-form-input' onChange={(e) => { setPrice(e.target.value) }} value={price} />
                    <div className="create-prop-form-label text-center">Discount</div>
                    <input type="text" placeholder='Enter the discount offered...' className='create-prop-form-input' onChange={(e) => { setDiscount(e.target.value) }} value={discount} />
                </div>
                <div className="absolute-center-column">
                    <div className='giftImageContainer absolute-center'>
                        <img src={image ? imagePreview : img} alt="" className='circular-image' />
                    </div>
                    <div style={{ marginTop: "12px" }}>
                        <label htmlFor="new-gift-image">
                            <span class="material-symbols-outlined edit-logo-icon set-add-image-position">
                                add_a_photo
                            </span>
                        </label>
                        <input type="file" hidden id="new-gift-image" onChange={validateImg} />
                    </div>
                </div>
            </div>
            <div className="create-prop-form-button text-center hover-effect" style={{ marginTop: "8px" }} onClick={handleSubmitEvent}>Create</div>
        </div>
    )
}
