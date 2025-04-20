import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./VetCardSlider.css";
import VetCard from "./VetCard";
import leftArrow from "../icons/VectorToLeft.svg";
import rightArrow from "../icons/VectorToRight.svg";

export default function VetCardSlider({ vets }) {
  const swiperRef = useRef(null);

  const dummyVet = {
    name: 'Unknown Vet',
    expYears: 0,
    location: 'Unavailable',
    contact: '### - ###',
    image: ''
  };

  const sliderVets =
    vets.length < 3
      ? [...vets, ...Array.from({ length: 3 - vets.length }, () => dummyVet)]
      : vets;

  return (
    <div className="vet-slider-container">
      {/* Left Navigation Arrow */}
      <div
        className="custom-arrow left-arrow"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <img src={leftArrow} alt="Left Arrow" />
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={10}
        slidesPerView={3}
        slidesPerGroup={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
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
        className="custom-arrow right-arrow"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <img src={rightArrow} alt="Right Arrow" />
      </div>
    </div>
  );
}