import React from "react";
import "./profilePicture.css";

function profilePicture({ profilePic, username }) {
  const imageSrc = profilePic || "/defaultUserprofile.png";

  return (
    <div className="profile-container">
      <img src={imageSrc} alt="Profile" className="profile-image" />
      <p className="username">@{username || "defaultUserprofile"}</p>
    </div>
  );
}

export default profilePicture;