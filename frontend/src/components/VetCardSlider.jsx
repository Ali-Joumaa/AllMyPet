import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./VetCardSlider.css";
import VetCard from "./VetCard";
import leftArrow from "../icons/VectorToLeft.svg";
import rightArrow from "../icons/VectorToRight.svg";

export default function VetCardSlider({ vets }) {
  // Create a dummy vet object for padding if needed
  const dummyVet = {
    name: 'Unknown Vet',
    expYears: 0,
    location: 'Unavailable',
    contact: '### - ###',
    image: ''
  };

  // If fewer than 3 items, pad the array with dummy objects
  const sliderVets =
    vets.length < 3
      ? [...vets, ...Array.from({ length: 3 - vets.length }, () => dummyVet)]
      : vets;

  // Store the swiper instance to control navigation via our custom buttons
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="vet-slider-container">
      {/* Left Navigation Arrow */}
      <div
        className="slider-arrow left"
        onClick={() => swiperInstance && swiperInstance.slidePrev()}
      >
        <img src={leftArrow} alt="Left Arrow" />
      </div>

      <Swiper
        onSwiper={setSwiperInstance}
        spaceBetween={10}
        slidesPerView={3}
        slidesPerGroup={3}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 5000, // 5 seconds
          disableOnInteraction: false, // keeps autoplay even after user interaction
        }}
        modules={[Autoplay]}
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="vet-slider"
      >
        {sliderVets.map((vet, index) => (
          <SwiperSlide key={index}>
            <VetCard vet={vet} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Navigation Arrow */}
      <div
        className="slider-arrow right"
        onClick={() => swiperInstance && swiperInstance.slideNext()}
      >
        <img src={rightArrow} alt="Right Arrow" />
      </div>
    </div>
  );
}