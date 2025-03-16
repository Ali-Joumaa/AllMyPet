import React from "react";
import "./PetEmotionCard.css"; // Import its own styling

function PetEmotionCard({ title, text, image }) {
  return (
    <div className="pet-emotion-card">
      {/* Paw Icon */}
      <img src="/Paw.png" alt="Paw Icon" className="paw-icon" />

      {/* Title */}
      <h3 className="pet-emotion-title">{title}</h3>

      {/* Description */}
      <p className="pet-emotion-text">{text}</p>

      {/* Bottom Image */}
      <img src={image} alt={title} className="pet-emotion-image" />
    </div>
  );
}

export default PetEmotionCard;
