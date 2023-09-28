import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth";
import { signOut, getAuth } from "firebase/auth";
import {app} from './firebase.config'

function Navbar() {
  const user = useAuth()
  const auth = getAuth(app)
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login")
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="back-img">
      <div className="navbar">
        <div className="logo-gen">Only<span style={{color:"rgba(22, 22, 63, 0.9)"}}>Reviews</span></div>
        <div className="navs">
          <div className="item">Home</div>
          <div className="item">About</div>
          <div className="item">Laptop</div>
          <div className="item">Testimonials</div>
        </div>
        {user? (<div className="cont" onClick={handleSignOut}>Sign Out</div>
        ) : (
          <div className="cont" onClick={() => navigate("/login")}>Sign in</div>
        )}
        {/* <div className="cont" onClick={() => navigate("/login")}>Sign in</div> */}
      </div>
      <div className="mainH">
        <h1>Welcome to OnlyReviews</h1>
        <div className="mainD">At OnlyReviews, we are dedicated to providing you with the best and most up-to-date reviews of laptops on the market. Our team of experts has years of experience testing and analyzing laptops to help you make the right decision for your needs.</div>
        <div className="cont">Learn More</div>
      </div>
    </div>
  );
}

export default Navbar;
