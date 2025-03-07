import React, { useState } from "react";
import Cat from "./Cat";
import "./raiseAPet.css";
import "./topHomePage.css";
import DogAndCatImage from "../images/DogAndCat.svg";
const RaiseAPet = () => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You entered: ${location}`);
  };

  const cats = [
    { name: "Hero", imageUrl: "../images/pitter.png" },
    { name: "Luna", imageUrl: "../images/pitter.png"},
    { name: "Simba", imageUrl: "../images/pitter.png" },
    { name: "Milo", imageUrl: "../images/pitter.png"},
  ];

  return (
    <div>   <div className="title-box">   <h1>Raise A Pet</h1>
    </div>
    <div className="center-container">
      <div className="raise-a-pet">
        <div className="top-home-container">
          <div className="top-home-text">
            <div
              className="container d-flex justify-content-center align-items-center"
              style={{ minHeight: "50vh" }}
            >
              <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
                <h2 className="text-center mb-4">Enter Your Location</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      placeholder="e.g., Beirut, Lebanon"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="top-home-image">
            <img src={DogAndCatImage} alt="Dog and Cat" />
          </div>
        </div>

        {/* Cat Cards Section */}
        <div className="row">
          {cats.map((cat, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <Cat name={cat.name} imageUrl={cat.imageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>

  );
};

export default RaiseAPet;