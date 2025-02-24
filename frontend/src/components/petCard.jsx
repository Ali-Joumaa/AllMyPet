import React, { useState } from "react";
import pitterImage from "../images/pitter.png";
import heartIcon from "../icons/favorite_border.svg";
import heartFilledIcon from "../icons/heart_filled.svg";
import locationIcon from "../icons/location_on.svg";

import "./petCard.css";

export default function PetCard(props) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="pet-card">
      {/* Pet Image */}
      <img
        className="pet-card-image"
        src={props.petImage ? props.petImage : pitterImage}
        alt="Pet"
      />

      {/* Card Content */}
      <div className="pet-card-content">
        {/* Pet Name & Favorite Icon */}
        <div className="pet-card-header">
          <h2 className="pet-card-title">{props.petName || "No Name Assigned"}</h2>
          <img
            src={isFavorite ? heartFilledIcon : heartIcon}
            alt="Favorite Icon"
            className="pet-card-heart-icon"
            onClick={() => setIsFavorite(!isFavorite)}
          />
        </div>

        {/* Location */}
        <p className="pet-card-location">
          <img src={locationIcon} alt="Location Icon" className="pet-card-location-icon" />
          {props.petLocation || "Location Unknown"}
        </p>

        {/* Pet Info Grid */}
        <div className="pet-card-info-grid">
          <p><span>Gender:</span> <span className="pet-card-tag">{props.petGender || "Unknown"}</span></p>
          <p><span>Breed:</span> <span className="pet-card-tag">{props.petBreed || "Unknown"}</span></p>
          <p><span>Age:</span> <span className="pet-card-tag">{props.petAge || "Unknown"}</span></p>
          <p><span>Size:</span> <span className="pet-card-tag">{props.petSize || "Unknown"}</span></p>
        </div>

        {/* Description */}
        <p className="pet-card-description">
          {props.petDescription || "No description available."}
        </p>

        {/* More Info Button */}
        <button className="pet-card-more-info">More Info</button>
      </div>
    </div>
  );
}
