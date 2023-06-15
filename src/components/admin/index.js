import React, { useState } from 'react';
import './admin.css';
import logo from '../../assets/img/mac.png';
import axios from 'axios';

export default function AdminLogin({ setIsAuthenticating }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminKey, setAdminKey] = useState("");

    function handleClickEvent() {
        if (!email || !password || !adminKey) {
            return alert("Please fill out the form.")
        }
        const data = { email, password, adminKey };
        axios.post("http://localhost:5050/api/v1/admin/login", data)
            .then((res) => {
                localStorage.setItem("authToken", res.data.token);
                alert("Login as admin successful!");
                setIsAuthenticating("granted");
            })
            .catch((err) => {
                alert(err.response.data);
            })
    }

    return (
        <div className="max-width">
            <div className="admin-login-page-logo-container">
                <img src={logo} alt="" className='logo-image-container' />
            </div>
            <div className='admin-login-container'>
                <div className="admin-login-title-container">
                    <div className="admin-login-title text-center">Macbease</div>
                    <div className="admin-login-title text-center" style={{ fontSize: '16px' }}>Login as admin</div>
                </div>
                <div className="admin-login-form-container">
                    <div className="admin-login-label-container text-center">Email</div>
                    <input type="email" className='admin-login-input-container' placeholder='Enter your email...' autoFocus={true} onChange={(e) => { setEmail(e.target.value) }} />
                    <div className="admin-login-label-container text-center">Password</div>
                    <input type="password" className='admin-login-input-container' placeholder='Enter your password...' autoFocus={true} onChange={(e) => { setPassword(e.target.value) }} />
                    <div className="admin-login-label-container text-center">Admin Key</div>
                    <input type="text" className='admin-login-input-container' placeholder='Enter your admin key...' autoFocus={true} onChange={(e) => { setAdminKey(e.target.value) }} />
                    <div className="admin-form-submit-button text-center hover-effect" onClick={handleClickEvent}>Login</div>
                </div>
            </div>
        </div>
    )
}
