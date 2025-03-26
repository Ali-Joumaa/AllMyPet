import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./VetCardSlider.css";
import VetCard from "./VetCard";
import leftArrow from "../icons/VectorToLeft.svg";
import rightArrow from "../icons/VectorToRight.svg";

export default function VetCardSlider({ vets }) {
  return (
    <div className="vet-slider-container">
      {/* Left Navigation Arrow */}
      <div className="slider-arrow left">
        <img src={leftArrow} alt="Left Arrow" />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={3}
        navigation={{ nextEl: ".right", prevEl: ".left" }}
        loop={true}
        centeredSlides={true}
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="vet-slider"
      >
        {vets.map((vet, index) => (
          <SwiperSlide key={index}>
            <VetCard vet={vet} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Navigation Arrow */}
      <div className="slider-arrow right">
        <img src={rightArrow} alt="Right Arrow" />
      </div>
    </div>
    
  );
}
