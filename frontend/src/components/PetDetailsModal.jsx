import React from "react";
import "./PetDetailsModal.css";
import { FaTimes } from "react-icons/fa";

const PetDetailsModal = ({ pet, onClose }) => {
  if (!pet) return null;

  const {
    petPhoto,
    imageUrl,
    name,
    petName,
    species,
    petSpecies,
    breed,
    sex,
    age,
    location,
    status,
    description,
    vaccines,
    healthInfo,
    username,
  } = pet;

  const resolvedName = name || petName || "Unknown";
  const resolvedSpecies = species || petSpecies || "Unknown";
  const resolvedImage =
    petPhoto || imageUrl || "https://i0.wp.com/meissaprint.co.uk/wp-content/uploads/2022/06/mini-paw.png?fit=2084%2C2084&ssl=1";

  return (
    <div className="clean-modal-container">
      <div className="clean-modal-card">
        <button className="clean-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className="clean-modal-title">{resolvedName}</h2>

        <img
          src={resolvedImage}
          alt={resolvedName}
          className="clean-modal-img"
        />

        <div className="clean-modal-grid">
          <div className="field">
            <strong>Species:</strong> {resolvedSpecies}
          </div>
          <div className="field">
            <strong>Breed:</strong> {breed?.trim() || "Unknown"}
          </div>
          <div className="field">
            <strong>Age:</strong> {age != null ? age : "Unknown"}
          </div>
          <div className="field">
            <strong>Sex:</strong> {sex?.trim() || "Unknown"}
          </div>
          <div className="field">
            <strong>Location:</strong> {location?.trim() || "Unknown"}
          </div>
          <div className="field">
            <strong>Status:</strong> {status?.trim() || "Unknown"}
          </div>
          <div className="field full-width">
            <strong>Description:</strong> {description?.trim() || "No description"}
          </div>
          <div className="field full-width">
            <strong>Vaccines:</strong> {vaccines?.trim() || "Not specified"}
          </div>
          <div className="field full-width">
            <strong>Health Info:</strong> {healthInfo?.trim() || "Not specified"}
          </div>
          <div className="field">
            <strong>Owner:</strong> {username?.trim() || "Unknown"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsModal;
