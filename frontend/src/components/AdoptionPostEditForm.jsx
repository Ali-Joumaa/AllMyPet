import React, { useState, useEffect } from "react";
import "./AdoptionPostEditForm.css";

function AdoptionPostEditForm({ postData, onPostUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Available",
    adoptionType: "Temporary",
    petId: "",
  });

  useEffect(() => {
    if (postData) {
      setFormData({
        title: postData.title || "",
        description: postData.description || "",
        status: postData.status || "Available",
        adoptionType: postData.adoptionType || "Temporary",
        petId: postData.petId || "",
      });
    }
  }, [postData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You're not logged in!");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5555/api/adoption-posts/${postData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update post");
      }
  
      const updatedPost = await response.json();
      onPostUpdated(updatedPost);
      onCancel(); //  Close the edit form automatically
    } catch (error) {
      console.error(" Error updating post:", error);
      alert("Update failed: " + error.message);
    }
  };
  

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
  <h2>Edit Adoption Post</h2>

  <label>Title:</label>
  <input
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
    required
  />

  <label>Description:</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    required
  />

  <label>Adoption Status:</label>
  <select name="status" value={formData.status} onChange={handleChange}>
    <option value="Available">Available</option>
    <option value="Not Available">Not Available</option>
  </select>

  <label>Adoption Type:</label>
  <select
    name="adoptionType"
    value={formData.adoptionType}
    onChange={handleChange}
  >
    <option value="Temporary">Temporary</option>
    <option value="Permanent">Permanent</option>
  </select>

  <label>Pet:</label>
  <input
    type="text"
    value={`${postData.petName} (${postData.petSpecies})`}
    readOnly
    disabled
  />

  <div className="edit-form-buttons">
    <button type="submit" className="edit-form-submit">Update</button>
    <button type="button" onClick={onCancel} className="edit-form-cancel">Cancel</button>
  </div>
</form>

  );
}

export default AdoptionPostEditForm;
