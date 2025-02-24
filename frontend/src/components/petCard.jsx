import React, { useState } from "react";
import pitterImage from "../images/pitter.png";
import heartIcon from "../icons/favorite_border.svg";
import heartFilledIcon from "../icons/heart_filled.svg";
import locationIcon from "../icons/location_on.svg";

import "./petCard.css";

export default function PetCard(props) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="card">
      {/* Pet Image */}
      <img 
        src={props.petImage ? props.petImage : pitterImage} 
        alt="Pet" 
        className="card-image" 
      />

      {/* Card Content */}
      <div className="card-content">
        {/* Pet Name & Favorite Icon */}
        <div className="card-header-pet">
          <h2 className="card-title">{props.petName ? props.petName : "No Name Assigned"}</h2>
          <img 
            src={isFavorite ? heartFilledIcon : heartIcon} 
            alt="Favorite Icon" 
            className="heart-icon" 
            onClick={() => setIsFavorite(!isFavorite)}
          />
        </div>

        {/* Location */}
        <p className="location">
          <img src={locationIcon} alt="Location Icon" className="location-icon" />
          {props.petLocation ? props.petLocation : "Location Unknown"}
        </p>

        {/* Pet Info Grid */}
        <div className="info-grid">
          <p><span>Gender:</span> <span className="tag">{props.petGender ? props.petGender : "Unknown"}</span></p>
          <p><span>Breed:</span> <span className="tag">{props.petBreed ? props.petBreed : "Unknown"}</span></p>
          <p><span>Age:</span> <span className="tag">{props.petAge ? props.petAge : "Unknown"}</span></p>
          <p><span>Size:</span> <span className="tag">{props.petSize ? props.petSize : "Unknown"}</span></p>
        </div>

        {/* Description */}
        <p className="description">
          {props.petDescription ? props.petDescription : "No description available."}
        </p>

        {/* More Info Button */}
        <button className="more-info">More Info</button>
      </div>
    </div>
  );
}
