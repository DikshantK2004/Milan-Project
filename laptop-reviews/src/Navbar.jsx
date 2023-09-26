import React from "react";
import "./Navbar.css";
import {useNavigate} from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  return (
    <div className="back-img">
      <div className="navbar">
        <div className="logo-gen">Jcube</div>
        <div className="navs">
          <div className="item">Home</div>
          <div className="item">About</div>
          <div className="item">Laptop</div>
          <div className="item">Testimonials</div>
        </div>
        <div className="cont" onClick={() => navigate("/login")}>Sign in</div>
      </div>
      <div className="mainH">
        <h1>Welcome to Laptop <br />Review</h1>
        <div className="mainD">At Laptop Review, we are dedicated to providing you with the best and most up-to-date reviews of laptops on the market. Our team of experts has years of experience testing and analyzing laptops to help you make the right decision for your needs. Click here to learn more.</div>
        <div className="cont">Learn More</div>
      </div>
    </div>
  );
}

export default Navbar;
