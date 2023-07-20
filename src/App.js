import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import AdminHeader from '../src/components/headerAdmin';
import AdminClub from "../src/components/adminClub";
import AdminEvent from '../src/components/adminEvent';
import AdminVendor from '../src/components/adminVendor';
import AdminHome from '../src/components/adminHome';
import AdminProps from '../src/components/adminProps';
import AdminGifts from '../src/components/adminGifts';
import AdminCard from '../src/components/adminCard';
import AdminLogin from './components/admin';
import AdminCommunity from './components/adminCommunity';
import AdminContent from './components/adminContent';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState("yes");
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    if (token) {
      const data = { token };
      console.log("fired", token);
      axios.post("http://localhost:5050/api/v1/frontend/verifyToken", data).then((res) => {
        console.log(res.data);
        if (res.data.role === "admin") {
          setIsAuthenticating("granted");
          return
        }
        else {
          setIsAuthenticating("declined");
          return
        }
      })
    }
    setIsAuthenticating("declined");
  }, [])

  if (isAuthenticating === "declined") {
    return <AdminLogin setIsAuthenticating={setIsAuthenticating} />
  }

  return (
    <div className='max-width'>
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {getCorrectScreen(activeTab, setActiveTab)}
    </div>
  );
}

const getCorrectScreen = (activeTab, setActiveTab) => {
  switch (activeTab) {
    case "Home":
      return <AdminHome setActiveTab={setActiveTab} />
    case "Club":
      return <AdminClub setActiveTab={setActiveTab} />
    case "Event":
      return <AdminEvent setActiveTab={setActiveTab} />
    case "Vendor":
      return <AdminVendor setActiveTab={setActiveTab} />
    case "Props":
      return <AdminProps setActiveTab={setActiveTab} />
    case "Gifts":
      return <AdminGifts setActiveTab={setActiveTab} />
    case "Cards":
      return <AdminCard setActiveTab={setActiveTab} />
    case "Community":
      return <AdminCommunity setActiveTab={setActiveTab} />
    case "Content":
      return <AdminContent setActiveTab={setActiveTab} />
    default:
      return <AdminHome setActiveTab={setActiveTab} />
  }
}


export default App;
