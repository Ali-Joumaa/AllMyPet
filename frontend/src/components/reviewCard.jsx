import React from "react";
import "./reviewCard.css";
import starIcon from "../icons/star.svg";
import defaultReviewPic from "../images/ReviewPic.png";

export default function ReviewCard(props) {
  return (
    <div className="review-card">
      <img 
        src={props.reviewerImage ? props.reviewerImage : defaultReviewPic} 
        alt="Reviewer" 
        className="review-profile-pic" 
      />
      <div className="review-content">
        <div className="review-stars">
          {[...Array(5)].map((_, i) => (
            <img key={i} src={starIcon} alt="Star" className="star-icon" />
          ))}
        </div>
        <h3 className="reviewer-name">
          {props.reviewerName ? props.reviewerName : "Anonymous"}
        </h3>
        <p className="review-text">
          {props.reviewerText ? props.reviewerText : "No review available."}
        </p>
      </div>
    </div>
  );
}