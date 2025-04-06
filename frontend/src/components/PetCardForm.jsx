import React, { useState } from "react";
import "./PetCardForm.css";
import { useNavigate } from "react-router-dom";

import {
  FaPaw,
  FaDog,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaCheck,
  FaCamera,
} from "react-icons/fa";

export default function PetCardForm() {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    sex: "Male",
    petPhoto: "",
    description: "",
    vaccines: "",
    healthInfo: "",
    location: "",
    status: "Available",
  });
  const navigate = useNavigate();


  const [previewImage, setPreviewImage] = useState("/default-pet.png");

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "petPhoto") {
      setPreviewImage(value || "/default-pet.png");
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to create a pet card.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5555/api/pets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unknown error");
      }
  
      let created = {};
      try {
        created = await response.json(); // only if there's a response body
      } catch (err) {
        console.warn("No JSON response body (probably 204 or empty)", err);
      }

      // Optionally reset the form
      setFormData({
        name: "",
        species: "",
        breed: "",
        age: "",
        sex: "Male",
        petPhoto: "",
        description: "",
        vaccines: "",
        healthInfo: "",
        location: "",
        status: "Available",
      });
      setPreviewImage("/default-pet.png");
      alert("Pet card created successfully!");
      navigate("/profile"); // or `/profile/${created.userId}` if you want dynamic

    } catch (err) {
      console.error("❌ Submission error:", err);
    }
  };

  return (
    <div className="pet-card-container">
      <div className="left-section">
        <h2 className="title">
          Create a <span className="highlight">Pet Card</span> 🐾
        </h2>
        <img src={previewImage} alt="Pet Preview" className="pet-image" />
      </div>

      <div className="right-section">
        <h2 className="form-title">Fill in the details 🐶</h2>
        <form className="pet-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <FaPaw className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Pet Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <FaDog className="icon" />
              <input
                type="text"
                name="species"
                placeholder="Species (e.g., Dog, Cat)"
                required
                value={formData.species}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <FaInfoCircle className="icon" />
              <input
                type="text"
                name="breed"
                placeholder="Breed (Optional)"
                value={formData.breed}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                name="age"
                placeholder="Age (Years)"
                required
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <select name="sex" value={formData.sex} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                name="location"
                placeholder="Location"
                required
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* ✅ IMAGE URL ONLY */}
            <div className="input-group">
  <FaCamera className="icon" />
  <input
    type="text"
    name="petPhoto"
    placeholder="Enter Image URL"
    value={formData.petPhoto}
    onChange={handleChange}
  />
</div>


            <div className="input-group full-width">
              <textarea
                name="description"
                placeholder="Short Description (Optional)"
                rows="2"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="input-group">
              <textarea
                name="vaccines"
                placeholder="Vaccines (Optional)"
                rows="3"
                value={formData.vaccines}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="input-group">
              <textarea
                name="healthInfo"
                placeholder="Health Info (Optional)"
                rows="3"
                value={formData.healthInfo}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="input-group">
              <FaCheck className="icon" />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Adopted">Adopted</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create Pet Card
          </button>
        </form>
      </div>
    </div>
  );
}
