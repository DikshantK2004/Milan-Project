import React from "react";
import "./Services.css";

function Services() {
  return (
    <div className="services">
      <div className="sertxt">
          <div className="head6">Our Services</div>
          <h4>Taking Your Laptop Experience to the Next Level</h4>
          <div className="serimg">
            <div className="item1">
                <img className="serimgitem" src={require("./assets/Reviews.png")} alt="img1" />
                <div className="serimgtxt">Laptop Reviews</div>
                <p>Our team of experts provides in-depth laptop reviews, including the latest models and top brands. We analyze everything from performance to design to help you make an informed decision.</p>
            </div>
            <div className="item1">
                <img className="serimgitem" src={require("./assets/Comparison2.png")} alt="img1" />
                <div className="serimgtxt">Laptop Comparisons</div>
                <p>Not sure which laptop to choose? We provide detailed comparisons of similar models, highlighting the key differences to make your decision easier.</p>
            </div>
            <div className="item1">
                <img className="serimgitem" src={require("./assets/Guide.png")} alt="img1" />
                <div className="serimgtxt">Laptop Buying Guide</div>
                <p>Buying a laptop can be overwhelming. Our laptop buying guide provides you with everything you need to know, including how to choose the right size, features, and brand for your needs.</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Services;
