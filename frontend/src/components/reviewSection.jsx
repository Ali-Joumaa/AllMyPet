import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./reviewSection.css";
import ReviewCard from "./reviewCard";
import leftArrow from "../icons/VectorToLeft.svg";
import rightArrow from "../icons/VectorToRight.svg";
import defaultReviewPic from "../images/ReviewPic.png";
import { useNavigate } from "react-router-dom";

export default function ReviewSection() {
  const swiperRef = useRef(null);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    reviewerText: "",
    numberOfStars: 5,
  });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [token]);

  const fetchReviews = () => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    fetch("http://localhost:5555/api/ratings/recent", { headers })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((r) => ({
          reviewerName: r.username || "Anonymous",
          reviewerText: r.description,
          reviewerImage: r.userProfilePicture || defaultReviewPic,
          numberOfStars: r.numberOfStars || 5,
        }));
        setReviews(mapped);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5555/api/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username,
        description: newReview.reviewerText,
        numberOfStars: newReview.numberOfStars,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(() => fetchReviews())
      .finally(() => {
        setShowModal(false);
        setNewReview({ reviewerText: "", numberOfStars: 5 });
        setHoverRating(0);
        swiperRef.current?.slideToLoop(0, 0); // reset swiper to first slide
      })
      .catch((err) => console.error("Error submitting review:", err));
  };

  const handleStarClick = (rating) => setNewReview({ ...newReview, numberOfStars: rating });

  const handlewriteReviewClick = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  return (
    <div className={`review-section ${showModal ? "blurred" : ""}`}>
      <h2 className="review-title">
        What People say <span className="highlight-text">about us</span>
      </h2>

      <div className="arrow-wrapper">
        {/* Left Arrow */}
        <img
          src={leftArrow}
          alt="Left"
          className="slider-arrow left-arrow"
          onClick={() => swiperRef.current?.slidePrev()}
        />

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={100}
          slidesPerView={3}
          slidesPerGroup={1}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="reviews-container"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard {...review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Arrow */}
        <img
          src={rightArrow}
          alt="Right"
          className="slider-arrow right-arrow"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>

      <button className="write-review-btn" onClick={handlewriteReviewClick}>
        Write a Review
      </button>

      {showModal && (
        <div className="news-modal-overlay local">
          <form className="review-form scale-in" onSubmit={handleSubmit}>
            <div className="news-modal-close" onClick={() => setShowModal(false)}>
              ✕
            </div>
            <h3>Write a Review</h3>

            <textarea
              placeholder="Your review"
              required
              value={newReview.reviewerText}
              onChange={(e) => setNewReview({ ...newReview, reviewerText: e.target.value })}
            />
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <svg
                  key={n}
                  onClick={() => handleStarClick(n)}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill={n <= (hoverRating || newReview.numberOfStars) ? "#FFD700" : "#ccc"}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ cursor: "pointer", transition: "0.2s" }}
                >
                  <path d="M12 2L14.9 8.6L22 9.3L16.5 14.1L18 21.1L12 17.8L6 21.1L7.5 14.1L2 9.3L9.1 8.6L12 2Z" />
                </svg>
              ))}
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}