import React from "react";
import "./topHomePage.css";
import DogAndCatImage from "../images/DogAndCat.svg";
import {useNavigate} from "react-router-dom";

export default function TopHomePage() {
  const navigate = useNavigate();

  const handleAdoptClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/adopt");
    }
  };
  
  const handleRaiseClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/raisePets");
    }
  };

  return (
    <div className="top-home-container">
      <div className="top-home-text">
        <h1>
          Give a Pet a <br />
          <span className="loving-text">
            Loving <span style={{ color: "#2E256F" }}>Home</span>
          </span>
        </h1>
        <p>
          Looking for a furry companion? Many adorable pets are waiting for a
          forever home. Browse through our adoption listings and find the
          perfect match for your family. Adopting a pet not only brings joy to
          your home but also saves a life.
        </p>
        <div className="top-home-buttons">
          <button className="adopt-btn" onClick={handleAdoptClick}>Adopt Now</button>
          <button className="raise-btn" onClick={handleRaiseClick}>Raise a Pet</button>
        </div>
      </div>
      <div className="top-home-image">
        <img src={DogAndCatImage} alt="Dog and Cat" />
      </div>
    </div>
  );
}
