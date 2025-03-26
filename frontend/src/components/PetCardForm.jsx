import React, { useState } from "react";
import "./PetCardForm.css";
import { FaPaw, FaDog, FaInfoCircle, FaMapMarkerAlt, FaCheck, FaCamera } from "react-icons/fa";

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

  const [previewImage, setPreviewImage] = useState("/default-pet.png");
  const [isUrlMode, setIsUrlMode] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "petPhoto") {
      setIsUrlMode(true);
      setPreviewImage(value || "/default-pet.png");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setIsUrlMode(false);
      setFormData({ ...formData, petPhoto: "" }); // Clear URL input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Pet Card Submitted:", formData);
  };

  return (
    <div className="pet-card-container">
      <div className="left-section">
        <h2 className="title">Create a <span className="highlight">Pet Card</span> 🐾</h2>
        <img src={previewImage} alt="Pet Preview" className="pet-image" />
      </div>

      <div className="right-section">
        <h2 className="form-title">Fill in the details 🐶</h2>
        <form className="pet-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <FaPaw className="icon" />
              <input type="text" name="name" placeholder="Pet Name" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <FaDog className="icon" />
              <input type="text" name="species" placeholder="Species (e.g., Dog, Cat)" required onChange={handleChange} />
            </div>

            <div className="input-group">
              <FaInfoCircle className="icon" />
              <input type="text" name="breed" placeholder="Breed (Optional)" onChange={handleChange} />
            </div>
            <div className="input-group">
              <input type="number" name="age" placeholder="Age (Years)" required onChange={handleChange} />
            </div>

            <div className="input-group">
              <select name="sex" onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <FaMapMarkerAlt className="icon" />
              <input type="text" name="location" placeholder="Location" required onChange={handleChange} />
            </div>

            {/* Only One Image Input Allowed */}
            {isUrlMode ? (
              <div className="input-group">
                <FaCamera className="icon" />
                <input
                  type="text"
                  name="petPhoto"
                  placeholder="Enter Image URL"
                  onChange={handleChange}
                  disabled={!isUrlMode}
                />
                <button type="button" className="toggle-button" onClick={() => setIsUrlMode(false)}>Use File</button>
              </div>
            ) : (
              <div className="input-group">
                <input type="file" accept="image/*" onChange={handleFileChange} disabled={isUrlMode} />
                <button type="button" className="toggle-button" onClick={() => setIsUrlMode(true)}>Use URL</button>
              </div>
            )}

            <div className="input-group full-width">
              <textarea name="description" placeholder="Short Description (Optional)" rows="2" onChange={handleChange}></textarea>
            </div>

            {/* Vaccines & Health Info are now independent! */}
            <div className="input-group">
              <textarea name="vaccines" placeholder="Vaccines (Optional)" rows="3" onChange={handleChange}></textarea>
            </div>
            <div className="input-group">
              <textarea name="healthInfo" placeholder="Health Info (Optional)" rows="3" onChange={handleChange}></textarea>
            </div>

            <div className="input-group">
              <FaCheck className="icon" />
              <select name="status" onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="Adopted">Adopted</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-button">Create Pet Card</button>
        </form>
      </div>
    </div>
  );
}