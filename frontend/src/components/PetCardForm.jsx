// PetCardForm.jsx
import React, { useState, useEffect } from "react";
import "./PetCardForm.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  FaPaw,
  FaDog,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaCheck,
  FaCamera,
  FaTrash,
} from "react-icons/fa";

export default function PetCardForm() {
  const { petId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const defaultImageURL = "https://i0.wp.com/meissaprint.co.uk/wp-content/uploads/2022/06/mini-paw.png?fit=2084%2C2084&ssl=1";

  const defaultFormData = {
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    sex: "Male",
    petPhoto: "",
    description: "",
    vaccines: "",
    healthInfo: "",
    location: "",
    // status: "Available",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [previewImage, setPreviewImage] = useState(defaultImageURL);

  useEffect(() => {
    const loadPetData = async () => {
      const token = localStorage.getItem("token");
  
      if (location.state?.pet) {
        // 🟢 Pet was passed from Profile.jsx
        const pet = location.state.pet;
        setFormData({
          name: pet.name,
          species: pet.species,
          breed: pet.breed,
          age: pet.age,
          sex: pet.sex,
          petPhoto: pet.petPhoto,
          description: pet.description,
          vaccines: pet.vaccines,
          healthInfo: pet.healthInfo,
          location: pet.location,
          status: pet.status,
        });
        setPreviewImage(pet.petPhoto || defaultImageURL);
      } else if (petId) {
        // 🟡 Fallback for direct access to /PetCardForm/:petId
        try {
          const res = await fetch(`http://localhost:5555/api/pets/${petId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!res.ok) throw new Error("Failed to fetch pet");
  
          const data = await res.json();
          setFormData({
            name: data.name,
            species: data.species,
            breed: data.breed,
            age: data.age,
            sex: data.sex,
            petPhoto: data.petPhoto,
            description: data.description,
            vaccines: data.vaccines,
            healthInfo: data.healthInfo,
            location: data.location,
            status: data.status,
          });
          setPreviewImage(data.petPhoto || defaultImageURL);
        } catch (err) {
          console.error("❌ Error loading pet data:", err);
          alert("Failed to load pet info for editing.");
        }
      }
    };
  
    loadPetData();
  }, [petId, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "petPhoto") {
      setPreviewImage(value || defaultImageURL);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const method = petId ? "PUT" : "POST";
    const url = petId
      ? `http://localhost:5555/api/pets/update/${petId}`
      : "http://localhost:5555/api/pets/create";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(await response.text());

      alert(petId ? "Pet card updated!" : "Pet card created!");
      navigate("/profile/me");
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5555/api/pets/delete/${petId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error(await response.text());
      alert("Pet deleted successfully!");
      navigate("/profile/me");
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete pet.");
    }
  };

  return (
    <div className="pet-card-wrapper">
    <div className="pet-card-container">
      <div className="left-section">
        <h2 className="title">
          {petId ? "Update" : "Create"} <span className="highlight">Pet Card</span> 🐾
        </h2>
        <img src={previewImage} alt="Pet Preview" className="pet-image" />
      </div>

      <div className="right-section">
        <h2 className="form-title">Fill in the details 🐾 </h2>
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
              <select
                name="species"
                required
                value={formData.species}
                onChange={handleChange}
              >
                {/* <option value="">Select Species</option> */}
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
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
            {petId ? "Update Pet Card" : "Create Pet Card"}
          </button>

          {petId && (
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              <FaTrash /> Delete Pet
            </button>
          )}
        </form>
      </div>
    </div>
    </div>
  );
}
