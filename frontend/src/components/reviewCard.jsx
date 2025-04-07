import React, { useState } from "react";
import "./reviewCard.css";
import starIcon from "../icons/star.svg";
import defaultReviewPic from "../images/ReviewPic.png";

export default function ReviewCard(props) {
  const filledStars = props.numberOfStars || 5;
  const [isExpanded, setIsExpanded] = useState(false);

  const text = props.reviewerText || "No review available.";
  const shouldTruncate = text.length > 150;
  const displayText = isExpanded || !shouldTruncate
  ? text
  : `${text.slice(0, 150)}...`;


  return (
    <div className="review-card">
      <img 
        src={props.reviewerImage ? props.reviewerImage : defaultReviewPic} 
        alt="Reviewer" 
        className="review-profile-pic" 
      />
      <div className="review-content">
        <h3 className="reviewer-name">
          {props.reviewerName ? props.reviewerName : "Anonymous"}
        </h3>
        <div className="review-stars">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={starIcon}
              alt="Star"
              className={`star-icon ${i < filledStars ? "filled" : "dimmed"}`}
            />
          ))}
        </div>
        
        <p className={`review-text ${isExpanded ? "expanded" : ""}`}>
  {displayText}
</p>
        {shouldTruncate && (
          <span 
            className="read-more-toggle" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Read more"}
          </span>
        )}
      </div>
    </div>
  );
}
