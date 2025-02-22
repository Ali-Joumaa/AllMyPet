import React, { useState } from "react";
import pitterImage from "../images/pitter.png";
import heartIcon from "../icons/favorite_border.svg";
import locationIcon from "../icons/location_on.svg";
import heartFilledIcon from "../icons/heart_filled.svg";

import "./petCard.css";


export default function PetCard(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="card">
      <img src={props.petImage? props.petImage : pitterImage} alt="pet_image" className="card-image" />
      <div className="card-content">
        <div className="card-header-pet">
          <h2 className="card-title">{props.petName ? props.petName : "no name assigned"}</h2>
          <img 
  src={isFavorite ? heartFilledIcon : heartIcon} 
  alt="Heart" 
  className="heart-icon" 
  onClick={() => setIsFavorite(!isFavorite)}
/>
        </div>
        <p className="location">
          <img src={locationIcon} alt="Location" className="location-icon" />
          {props.petLocation? props.petLocation: "No Location found"}
        </p>
        <div className="info-grid">
          <p><span>Gender:</span> <span className="tag">{props.petGender? props.petGender : "E404"}</span></p>
          <p><span>Breed:</span> <span className="tag">{props.petBreed? props.petBreed: "E404"}</span></p>
          <p><span>Age:</span> <span className="tag">{props.petAge? props.petAge : "E404"}</span></p>
          <p><span>Size:</span> <span className="tag">{props.petSize? props.petSize : "E404"}</span></p>
        </div>
        <p className="description">
          {props.petDescripton? props.petDescripton : "No Description FOUND"}
        </p>
        <button className="more-info">More Info</button>
      </div>
    </div>
  );
}
