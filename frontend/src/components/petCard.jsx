import React from "react";
import pitterImage from "../images/pitter.png";
import heartIcon from "../icons/favorite_border.svg";
import heartFilledIcon from "../icons/heart_filled.svg";
import locationIcon from "../icons/location_on.svg";
import "./petCard.css";

export default function PetCard(props) {
  const handleFavoriteClick = () => {
    if (props.onToggleFavorite) {
      props.onToggleFavorite(props.petId);
    }
  };

  return (
    <div className="pet-card">
      <img
        className="pet-card-image"
        src={props.petImage ? props.petImage : pitterImage}
        alt="Pet"
      />

      <div className="pet-card-content">
        <div className="pet-card-header">
          <h2 className="pet-card-title">{props.petName || ""}</h2>
          {!props.isNews && (
            <img
              src={props.isFavorite ? heartFilledIcon : heartIcon}
              alt="Favorite Icon"
              className="pet-card-heart-icon"
              onClick={handleFavoriteClick}
            />
          )}
        </div>

        {!props.isNews && (
          <>
            <p className="pet-card-location">
              <img
                src={locationIcon}
                alt="Location Icon"
                className="pet-card-location-icon"
              />
              {props.petLocation || "Location Unknown"}
            </p>
            <div className="pet-card-info-grid">
              <p>
                <span>Gender:</span>{" "}
                <span className="pet-card-tag">{props.petGender || "Unknown"}</span>
              </p>
              <p>
                <span>Breed:</span>{" "}
                <span className="pet-card-tag">{props.petBreed || "Unknown"}</span>
              </p>
              <p>
                <span>Age:</span>{" "}
                <span className="pet-card-tag">{props.petAge || "Unknown"}</span>
              </p>
              <p>
                <span>Size:</span>{" "}
                <span className="pet-card-tag">{props.petSize || "Unknown"}</span>
              </p>
            </div>
          </>
        )}

        <div className="pet-card-bottom">
          <p className="pet-card-description">
            {props.petDescription || "No description available."}
          </p>
          <button className="pet-card-more-info">More Info</button>
        </div>
      </div>
    </div>
  );
}
