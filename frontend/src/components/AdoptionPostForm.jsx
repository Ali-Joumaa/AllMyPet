import React, { useState, useEffect } from "react";
import "./AdoptionPostForm.css";

function AdoptionPostForm({ onPostAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Available",
    adoptionType: "Temporary",
    petId: "",
  });

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchUserPets = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5555/api/pets/mine", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch pets");

        const petList = await response.json();
        setPets(petList);
      } catch (err) {
        console.error("Error fetching pets:", err);
      }
    };

    fetchUserPets();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5555/api/adoption-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit post");

      const newPost = await response.json();
      onPostAdded(newPost);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="adopt-overlay">
      <form className="adopt-form" onSubmit={handleSubmit}>
        <h2>Create Adoption Post</h2>

        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Adoption Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>

        <label>Adoption Type:</label>
        <select name="adoptionType" value={formData.adoptionType} onChange={handleChange}>
          <option value="Temporary">Temporary</option>
          <option value="Permanent">Permanent</option>
        </select>

        <label>Pet:</label>
        <select name="petId" value={formData.petId} onChange={handleChange} required>
          <option value="">Select a pet</option>
          {pets.map((pet) => (
            <option key={pet.petId} value={pet.petId}>
              {pet.name} ({pet.species})
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdoptionPostForm;
