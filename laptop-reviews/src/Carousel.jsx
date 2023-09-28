import React, { useEffect } from "react";
import "./Carousel.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link } from "react-router-dom";

function Carousel() {
  useEffect(() => {
    const carousels = document.querySelectorAll(".carousel");

    for (let i = 0; i < carousels.length; i++) {
      carousel(carousels[i]);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function carousel(root) {
    const figure = root.querySelector("figure");
    const nav = root.querySelector("nav");
    const images = figure.children;
    const n = images.length;
    const gap = root.dataset.gap || 0;
    const bfc = "bfc" in root.dataset;
    const theta = (2 * Math.PI) / n;
    let currImage = 0;

    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    window.addEventListener("resize", handleResize);

    setupNavigation();

    function setupCarousel(n, s) {
      const apothem = s / (2 * Math.tan(Math.PI / n));

      figure.style.transformOrigin = `50% 50% ${-apothem}px`;

      for (let i = 0; i < n; i++) images[i].style.padding = `${gap}px`;
      for (let i = 1; i < n; i++) {
        images[i].style.transformOrigin = `50% 50% ${-apothem}px`;
        images[i].style.transform = `rotateY(${i * theta}rad)`;
      }
      if (bfc)
        for (let i = 0; i < n; i++)
          images[i].style.backfaceVisibility = "hidden";

      rotateCarousel(currImage);
    }

    function setupNavigation() {
      nav.addEventListener("click", onClick, true);

      function onClick(e) {
        e.stopPropagation();
        const t = e.target;
        console.log("tagname", t.tagName);
        if (
          t.tagName.toUpperCase() !== "BUTTON" &&
          t.tagName.toUpperCase() !== "SVG"
        )
          return;

        if (t.classList.contains("next")) {
          currImage++;
        } else {
          currImage--;
        }

        rotateCarousel(currImage);
      }
    }

    function rotateCarousel(imageIndex) {
      figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    }
  }

  function handleResize() {
    const carousels = document.querySelectorAll(".carousel");

    for (let i = 0; i < carousels.length; i++) {
      carousel(carousels[i]);
    }
  }

  return (
    <div className="carDiv">
      <div className="head6">Our Collection</div>
          <h4>We have a wide range of Laptops reviewed.</h4>
      <div class="carousel" data-gap="50">
          <figure>
            <img src={require("./assets/laptop_images/Acer-Aspire-LITE.png")} alt="lappy-img" />
            <img src={require("./assets/laptop_images/ASUS-Vivobook.png")} alt="lappy-img" />
            <img src={require("./assets/laptop_images/HP-Victus.png")} alt="lappy-img" />
            <img src={require("./assets/laptop_images/Inspiron-15.png")} alt="lappy-img" />
            <img src={require("./assets/laptop_images/Lenovo -Flex-5.png")} alt="lappy-img" />
            <img src={require("./assets/laptop_images/lenovo-ideapad-3-lite.png")} alt="lappy-img" />
            <img src={require("./assets/laptop_images/Macbook.png")} alt="lappy-img" />
            <img src={require("./assets/laptop_images/Microsoft-Surface-Go.png")} alt="lappy-img" />
            <img src={require("./assets/laptop_images/MSI.png")} alt="lappy-img" />
            <img src={require("./assets/laptop_images/Pavillion-15.png")} alt="lappy-img" />
          </figure>
        <nav>
          <button className="nav prev">
            <NavigateBeforeIcon className="prev" />
          </button>
          <button className="nav next">
            <NavigateNextIcon className="next" />
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Carousel;
