import React from "react";
import "./petCare.css";
import petCareImage from "../images/PetCare.svg";

export default function PetCare() {
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
        <button className="find-vet">Find a Vet</button>
      </div>
      <div className="pet-care-image">
        <img src={petCareImage} alt="Vet cares about pets" />
      </div>
    </div>
  );
}