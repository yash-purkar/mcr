import React, { useState } from "react";
import "./Carousel.css";

import carouselsData from "./carouselJsonData.json";

const Carousel = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleImageChange = (action) => {
    if (action === "next") {
      setCurrentImgIndex((prev) =>
        prev === carouselsData?.slides?.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImgIndex((prev) =>
        prev === 0 ? carouselsData?.slides?.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      {carouselsData?.slides.length > 0 ? (
        <div className="carousel_container">
          <div className="carousel_inner_container">
            {carouselsData?.slides?.map((slide, i) => (
              <img
                key={slide?.id}
                style={{ display: currentImgIndex === i ? "block" : "none" }}
                src={slide?.src}
                alt={slide?.alt}
              />
            ))}
            <button
              className="carousel_btn"
              style={{ top: "45%", left: "1%" }}
              onClick={handleImageChange}
            >
              &lt;
            </button>
            <button
              className="carousel_btn"
              onClick={() => handleImageChange("next")}
              style={{ top: "45%", right: "1%" }}
            >
              &gt;
            </button>
            {/* Bottom Count and action*/}
            <div className="bottom_buttons_box">
              {carouselsData?.slides?.map((item, i) => (
                <button
                  key={item?.id}
                  className="bottom_button"
                  style={{
                    border: i === currentImgIndex ? "4px solid #000" : "",
                  }}
                  onClick={() => setCurrentImgIndex(i)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>No Data Found</>
      )}
    </>
  );
};

export default Carousel;
