import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditProfile.css"; // ✅ Ensure CSS is unique and applied correctly

const EditProfile = ({ isOpen, onClose, userData, updateUser }) => {
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    bio: "",
    yearsPetting: "",
    address: "", // ✅ Fixed from "location" to "address"
  });

  const [previewImage, setPreviewImage] = useState("/default-profile.png");
  const [loading, setLoading] = useState(false);

  // ✅ Sync userData when modal opens
  useEffect(() => {
    if (userData) {
      setProfileData({
        profilePicture: userData.profilePictureURL || "",
        bio: userData.bio || "",
        yearsPetting: userData.yearsPetting || "",
        address: userData.address || "", // ✅ Ensure correct field name
      });

      setPreviewImage(userData.profilePictureURL || "/default-profile.png");
      console.log("🟢 Synced Profile Data:", userData);
    }
  }, [userData, isOpen]); // ✅ Added isOpen to ensure reloading on modal open

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // ✅ Show preview
      setProfileData({ ...profileData, profilePicture: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    console.log("🟢 Sending Token:", token);
    console.log("📢 Headers Being Sent:", {
      Authorization: `Bearer ${token}`,
    });
    
    if (!token) {
      alert("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (profileData.profilePicture instanceof File) {
      formData.append("profilePicture", profileData.profilePicture);
    }
    formData.append("bio", profileData.bio);
    formData.append("yearsPetting", profileData.yearsPetting);
    formData.append("address", profileData.address); // ✅ Fixed key name

    try {
      console.log("📢 Sending Profile Data:", {
        bio: profileData.bio,
        yearsPetting: profileData.yearsPetting,
        address: profileData.address,
        profilePicture: profileData.profilePicture instanceof File ? "Image File" : profileData.profilePicture,
      });
      
      const response = await axios.put(
  "http://localhost:5555/users/update-profile",
  { profilePicture:profileData.profilePictureURL, bio: profileData.bio, yearsPetting: profileData.yearsPetting, address: profileData.address },
  { headers: { Authorization: `Bearer ${token}` } }
);

      

      console.log("✅ Profile updated successfully:", response.data);
      updateUser(response.data); // ✅ Update profile info in parent component
      onClose(); // ✅ Close modal after success
    }  catch (error) {
      console.error("❌ Error updating profile:", error.response);
      if (error.response) {
          alert(`❌ Backend Error: ${error.response.status} - ${error.response.data.message || "Unknown error"}`);
      } else {
          alert("❌ Failed to update profile. No response from server.");
      }
  } finally {
  
      setLoading(false);
    }
  };

  if (!isOpen) return null; // ✅ Prevent rendering when modal is closed

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-container">
        <h2>Edit Profile</h2>
        <button className="edit-modal-close-btn" onClick={onClose}>×</button>

        <form onSubmit={handleSubmit} className="edit-modal-form">
          {/* Profile Picture Upload */}
          <label className="edit-modal-profile-pic-label">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <img src={previewImage} alt="Profile Preview" className="edit-modal-profile-preview" />
          </label>

          {/* Bio Input */}
          <label>Bio:</label>
          <textarea name="bio" value={profileData.bio} onChange={handleInputChange} />

          {/* Years of Petting Input */}
          <label>Years of Petting:</label>
          <input type="number" name="yearsPetting" value={profileData.yearsPetting} onChange={handleInputChange} />

          {/* Address Input */}
          <label>Address:</label>
          <input type="text" name="address" value={profileData.address} onChange={handleInputChange} />

          <button type="submit" className="edit-modal-save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
