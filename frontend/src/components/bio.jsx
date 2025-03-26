import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import address icon
import "./bio.css"; // Import the CSS file

const Bio = ({ bio, address, yearsPetting }) => {
  return (
    <div className="bio-container">
      {/* address with React Icon */}
      <p className="bio-address">
        <FaMapMarkerAlt className="icon" />
        {address || "address not set"}
      </p>

      {/* Years of Petting with Paw Image */}
      <p className="bio-years">
        <img src="/Paw.png" alt="Paw Icon" className="icon" />
        {yearsPetting ? `${yearsPetting} years of petting` : "Years of petting not set"}
      </p>

      {/* Bio Text */}
      <p className="bio-text">{bio || "This user hasn't written a bio yet."}</p>
    </div>
  );
};

export default Bio;
