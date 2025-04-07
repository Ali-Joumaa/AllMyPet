import React from "react";
import heartIcon from "../icons/favorite_border.svg";
import heartFilledIcon from "../icons/heart_filled.svg";
import locationIcon from "../icons/location_on.svg";
import { FaPencilAlt } from "react-icons/fa";
import "./petCard.css";

export default function PetCard(props) {
  const handleFavoriteClick = async () => {
    const token = localStorage.getItem("token");
    const petId = props.petData.petId;
  
    try {
      const url = props.isFavorite
        ? `http://localhost:5555/api/favorites/remove/${petId}`
        : `http://localhost:5555/api/favorites/add/${petId}`;
  
      const response = await fetch(url, {
        method: props.isFavorite ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update favorite: ${errorText}`);
      }
  
      // ✅ Notify parent to refresh state
      if (props.onToggleFavorite) {
        props.onToggleFavorite(petId);
      }
    } catch (err) {
      console.error("❌ Error toggling favorite:", err);
    }
  };

  const defaultImage =
    "https://i0.wp.com/meissaprint.co.uk/wp-content/uploads/2022/06/mini-paw.png?fit=2084%2C2084&ssl=1";

  const handleEditClick = () => {
    if (props.onEdit) {
      props.onEdit(props.petData);
    }
  };
  

  return (
    <div className="pet-card">
      <div className="image-wrapper">
        <img
          className="pet-card-image"
          src={props.petImage || defaultImage}
          alt="Pet"
        />
        {props.onEdit && (
          <div className="edit-icon-button" onClick={handleEditClick} title="Edit">
            <FaPencilAlt className="edit-icon-icon" />
          </div>
        )}
      </div>

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
                <span>Sex:</span>{" "}
                <span className="pet-card-tag">
                  {props.petSex }
                </span>
              </p>
              <p>
                <span>Breed:</span>{" "}
                <span className="pet-card-tag">
                  {props.petBreed}
                </span>
              </p>
              <p>
                <span>Age:</span>{" "}
                <span className="pet-card-tag">
                  {props.petAge }
                </span>
              </p>
              <p>
                <span>Species:</span>{" "}
                <span className="pet-card-tag">
                  {props.petSpecies || "Unknown"}
                </span>
              </p>
            </div>
          </>
        )}

        <div className="pet-card-bottom">
          <p className="pet-card-description">
            {props.petDescription || "No description available."}
          </p>
          {/* <button
            className="pet-card-more-info"
            onClick={() => props.onMoreInfo(props.petData)}
          >
            More Info
          </button> */}
        </div>
      </div>
    </div>
  );
}
