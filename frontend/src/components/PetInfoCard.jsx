import React from "react";
import "./PetInfoCard.css"; // Import shared CSS

function PetInfoCard({ title, text, image }) {
  return (
    <div className="pet-info-card">
      {/* Paw Icon */}
      <img src="/Paw.png" alt="Paw Icon" className="paw-icon" />

      {/* Title */}
      <h3 className="card-title">{title}</h3>

      {/* Description */}
      <p className="card-text">{text}</p>

      {/* Bottom Image */}
      <img src={image} alt={title} className="card-image" />
    </div>
  );
}

export default PetInfoCard;
