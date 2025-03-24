import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditProfile.css";

const EditProfile = ({ isOpen, onClose, userData, updateUser }) => {
  const [profileData, setProfileData] = useState({
    profilePictureURL: "",
    bio: "",
    yearsPetting: "",
    address: "",
  });

  const [previewImage, setPreviewImage] = useState("/default-profile.png");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🟢 Synced Profile Data:", userData);

    if (userData) {
      setProfileData({
        profilePictureURL: userData.profilePictureURL || "",
        bio: userData.bio || "",
        yearsPetting: userData.yearsPetting || "",
        address: userData.address || "",
        
      });

      setPreviewImage(userData.profilePictureURL || "/default-profile.png");
      console.log("🟢 Synced Profile Data:", userData);
    }
  }, [userData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });

    // 👇 If updating profile picture URL, update preview
    if (name === "profilePicture") {
      setPreviewImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5555/users/update-profile",
        {
          profilePictureURL: profileData.profilePicture, // ✅ Note: key is profilePictureURL
          bio: profileData.bio,
          yearsPetting: profileData.yearsPetting,
          address: profileData.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Profile updated successfully:", response.data);
      updateUser(response.data);
      onClose();
    } catch (error) {
      console.error("❌ Error updating profile:", error.response);
      if (error.response) {
        alert(
          `❌ Backend Error: ${error.response.status} - ${error.response.data.message || "Unknown error"}`
        );
      } else {
        alert("❌ Failed to update profile. No response from server.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-container">
        <h2>Edit Profile</h2>
        <button className="edit-modal-close-btn" onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleSubmit} className="edit-modal-form">
          {/* ✅ Profile Picture URL Input */}
          <label>Profile Picture URL:</label>
          <input
            type="text"
            name="profilePicture"
            value={profileData.profilePictureURL}
            onChange={handleInputChange}
          />
          <img
            src={previewImage}
            alt="Profile Preview"
            className="edit-modal-profile-preview"
          />

          {/* Bio Input */}
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
          />

          {/* Years of Petting Input */}
          <label>Years of Petting:</label>
          <input
            type="number"
            name="yearsPetting"
            value={profileData.yearsPetting}
            onChange={handleInputChange}
          />

          {/* Address Input */}
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
          />

          <button type="submit" className="edit-modal-save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
