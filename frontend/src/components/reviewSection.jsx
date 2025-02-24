import React from "react";
import "./reviewSection.css";
import ReviewCard from "./reviewCard";
import leftArrow from "../icons/VectorToLeft.svg";
import rightArrow from "../icons/VectorToRight.svg";
import defaultReviewPic from "../images/ReviewPic.png";

export default function ReviewSection() {
  const reviews = [
    { 
      reviewerName: "Angela Shamblin", 
      reviewerText: "I adopted my 3 month old chihuahua mix from them (and they were transported to CT). I was very skeptical at first because I couldn't find too much detail about them when I googled the group and I wasn't sure about the validity of Adopt-a-Pet.",
      reviewerImage: defaultReviewPic
    },
    { 
      reviewerName: "Zaire Botosh", 
      reviewerText: "We adopted our dog from here, and he had been very loved and taken care of by the staff. I would highly recommend.",
      reviewerImage: defaultReviewPic
    },
    { 
      reviewerName: "Monika Stanton", 
      reviewerText: "We adopted our Cowboy in October and he was an instant match for my family. We lost our last dog to cancer 6 months before and my husband wasn’t sure he was ready for a new dog yet, but as soon as we got him home we knew we made the right choice.",
      reviewerImage: defaultReviewPic
    },
    { 
      reviewerName: "James Rhiel Madsen", 
      reviewerText: "",
      reviewerImage: "" 
    },
  ];

  return (
    <div className="review-section">
      <h2 className="review-title">
        What People say <span className="highlight-text">about us</span>
      </h2>

      <div className="reviews-container">
        <img src={leftArrow} alt="Left" className="slider-arrow left-arrow" />
        {reviews.map((review, index) => (
          <ReviewCard 
            key={index} 
            reviewerName={review.reviewerName ? review.reviewerName : "Anonymous"}
            reviewerText={review.reviewerText ? review.reviewerText : "No review available."}
            reviewerImage={review.reviewerImage ? review.reviewerImage : defaultReviewPic}
          />
        ))}
        <img src={rightArrow} alt="Right" className="slider-arrow right-arrow" />
      </div>

      <button className="write-review-btn">Write a Review</button>
    </div>
  );
}