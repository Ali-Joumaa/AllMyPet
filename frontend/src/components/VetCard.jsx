import React from "react";
import "./VetCard.css";
import defaultVetPic from "../images/ReviewPic.png"; // Default image

export default function VetCard({ vet }) {
  return (
    <div className="vet-card">
      <img
        src={vet.image || defaultVetPic}
        alt={vet.name || "Vet Profile"}
        className="vet-image"
      />

      {/* Vet Info */}
      <div className="vet-info">
        <h3 className="vet-name">{vet.name || "Not Available"}</h3>
        <p className="vet-experience">Experience: {vet.expYears} years</p>
        <p className="vet-location">{vet.location || "N/A"}</p>
        <p className="vet-contact">📞 {vet.contact || "N/A"}</p>

      </div>
    </div>
  );
}