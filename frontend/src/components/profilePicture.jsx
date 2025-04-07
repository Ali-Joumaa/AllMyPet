import React, { useState } from "react";
import "./profilePicture.css";

function ProfilePicture({ profilePic, username }) {
  const imageSrc = profilePic || "/defaultUserprofile.png";
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="profile-container">
        <img
          src={imageSrc}
          alt="Profile"
          className="profile-image"
          onClick={handleOpen}
          style={{ cursor: "pointer" }}
        />
        <p className="username">@{username || "defaultUserprofile"}</p>
      </div>

      {showModal && (
        <div className="image-modal-overlay" onClick={handleClose}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={imageSrc} alt="Enlarged Profile" className="enlarged-profile-image" />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePicture;
