import React from "react";
import "./VetCard.css";
import defaultVetPic from "../images/ReviewPic.png"; // Default image
import starIcon from "../icons/star.svg";

export default function VetCard({ vet }) {
  return (
    <div className="vet-card">
      {/* Vet Image */}
      <img
        src={vet.image || defaultVetPic}
        alt={vet.name || "Vet Profile"}
        className="vet-image"
      />

      {/* Vet Info */}
      <div className="vet-info">
        <h3 className="vet-name">{vet.name || "Not Available"}</h3>
        <p className="vet-specialty">{vet.specialty || "N/A"}</p>
        <p className="vet-location">{vet.location || "N/A"}</p>
        <p className="vet-contact">📞 {vet.contact || "N/A"}</p>

        {/* Star Ratings */}
        <div className="vet-stars">
          {[...Array(5)].map((_, i) => (
            <img key={i} src={starIcon} alt="Star" className="star-icon" />
          ))}
        </div>
      </div>
    </div>
  );
}