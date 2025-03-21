import React from "react";
import pitterImage from "../images/pitter.png";

const Cat = ({ name, imageUrl }) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      {/* Image on top */}
      <img
        src={imageUrl} // Pass the image URL as a prop
        className="card-img-top"
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      {/* Card body */}
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "10px" }}>
          {name}
        </h5>
        <p className="card-text" style={{ fontSize: "0.9rem", color: "#555" }}>
          This is a {name} cat that can survive the weather in your city.
        </p>

        {/* Button (optional) */}
        <a href="/#" className="btn btn-primary" style={{ backgroundColor: "#675BC8", border: "none" }}>
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Cat;