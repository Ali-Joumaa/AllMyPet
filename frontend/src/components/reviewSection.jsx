import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./reviewSection.css";
import ReviewCard from "./reviewCard";
import leftArrow from "../icons/VectorToLeft.svg";
import rightArrow from "../icons/VectorToRight.svg";
import defaultReviewPic from "../images/ReviewPic.png";

export default function ReviewSection() {
  const reviews = [
    { 
      reviewerName: "Angela Shamblin", 
      reviewerText: "I adopted my 3 month old chihuahua mix from them...",
      reviewerImage: defaultReviewPic
    },
    { 
      reviewerName: "Zaire Botosh", 
      reviewerText: "We adopted our dog from here, and he had been very loved...",
      reviewerImage: defaultReviewPic
    },
    { 
      reviewerName: "Monika Stanton", 
      reviewerText: "We adopted our Cowboy in October and he was an instant match...",
      reviewerImage: defaultReviewPic
    },
    { 
      reviewerName: "James Rhiel Madsen", 
      reviewerText: "No review available.",
      reviewerImage: defaultReviewPic 
    },
  ];

  return (
    <div className="review-section">
      <h2 className="review-title">
        What People say <span className="highlight-text">about us</span>
      </h2>

      <div className="swiper-container">
        <div className="custom-arrow left-arrow">
          <img src={leftArrow} alt="Previous" />
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true} 
          navigation={{
            nextEl: ".custom-arrow.right-arrow",
            prevEl: ".custom-arrow.left-arrow",
          }}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="reviews-container"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard 
                reviewerName={review.reviewerName}
                reviewerText={review.reviewerText}
                reviewerImage={review.reviewerImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="custom-arrow right-arrow">
          <img src={rightArrow} alt="Next" />
        </div>
      </div>

      <button className="write-review-btn">Write a Review</button>
    </div>
  );
}