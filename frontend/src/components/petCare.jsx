import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./petCare.css";
import petCareImage from "../images/PetCare.svg";
// import { useNavigate } from "react-router-dom";

export default function PetCare() {
  const navigate = useNavigate();

  const handleVetClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/vets");
    }
  };

  return (
    <div className="pet-care-container">
      <div className="pet-care-text">
        <h1>
          Give your pet <br />
          <span className="care-message">the care they deserve</span>
        </h1>
        <p>
          We have a list of contracted professional vets that you can connect
          with to make sure your pet is always healthy.
        </p>
        <button className="find-vet" onClick={handleVetClick}>Find a Vet</button>
        <Link to="/addvet" className="add-a-vet-link">Add a Vet!</Link>
      </div>
      <div className="pet-care-image">
        <img src={petCareImage} alt="Vet cares about pets" />
      </div>
    </div>
  );
}