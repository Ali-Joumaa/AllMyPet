import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa"; // Import edit icon
import ProfilePicture from "./profilePicture"; 
import Bio from "./bio"; 
import EditProfileModal from "./editProfileModal"; // Import modal
import "./profileInfo.css"; 

const ProfileInfo = ({ profilePic, username, bio }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (newBio, newProfilePic) => {
    console.log("Saved:", newBio, newProfilePic);
    setIsModalOpen(false); // Close modal after saving
  };

  return (
    <div className="profile-info-container">
      {/* Edit Profile Icon */}
      <FaUserEdit className="edit-profile-icon" onClick={() => setIsModalOpen(true)} />

      <div className="profile-info">
        {/* Left Side: Profile Picture */}
        <ProfilePicture profilePic={profilePic} username={username} />

        {/* Right Side: Bio Section */}
        <Bio bio={bio} />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfileInfo;
