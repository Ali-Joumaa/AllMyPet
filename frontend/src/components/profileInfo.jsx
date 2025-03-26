import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa"; // Import edit icon
import ProfilePicture from "./profilePicture"; 
import Bio from "./bio"; 
import EditProfile from "./EditProfile"; // ✅ Import modal
import "./profileInfo.css"; 

const ProfileInfo = ({ profilePic, username, bio, yearsPetting, address, updateUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const [userInfo, setUserInfo] = useState({
  profilePic: profilePic || "",
  username: username || "",
  bio: bio || "",
  yearsPetting: yearsPetting !== undefined ? yearsPetting : null,
  address: address || "Not set",
});


  // ✅ Sync `userInfo` when props update (fix missing updates)
  useEffect(() => {
    console.log("🔍 Updating ProfileInfo State:", { 
      profilePic, username, bio, yearsPetting, address 
    });
  
    setUserInfo({
      profilePic: profilePic || "",
      username: username || "",
      bio: bio || "",
      yearsPetting: yearsPetting || 0,  // ✅ Ensure it's a number
      address: address || "Not set",
    });
  }, [profilePic, username, bio, yearsPetting, address]);
  

  // ✅ Open modal function with debug logs
  const openModal = () => {
    console.log("🟢 Opening Modal...");
    setIsModalOpen(true);
  };

  // ✅ Close modal function with debug logs
  const closeModal = () => {
    console.log("🔴 Closing Modal...");
    setIsModalOpen(false);
  };

  // ✅ Handle profile updates from the modal
  const handleSave = (updatedUser) => {
    console.log("✅ Profile Updated:", updatedUser);

    setUserInfo((prevUserInfo) => ({
      profilePic: updatedUser.profilePictureURL || prevUserInfo.profilePic,
      username: updatedUser.username || prevUserInfo.username,
      bio: updatedUser.bio !== undefined ? updatedUser.bio : prevUserInfo.bio,
      yearsPetting: updatedUser.yearsPetting !== undefined ? updatedUser.yearsPetting : prevUserInfo.yearsPetting,
      address: updatedUser.address !== undefined ? updatedUser.address : prevUserInfo.address,
    }));

    updateUser(updatedUser);  // ✅ Notify parent component (`Profile.js`)
    setIsModalOpen(false); // ✅ Close modal
  };

  return (
    <div className="profile-info-container">
      {console.log("🟡 Rendering ProfileInfo Component with data:", userInfo)}

      {/* Edit Profile Icon */}
      <FaUserEdit className="edit-profile-icon" onClick={openModal} />

      <div className="profile-info">
        {/* Left Side: Profile Picture */}
        <ProfilePicture profilePic={userInfo.profilePic} username={userInfo.username} />

        {/* Right Side: Bio Section */}
        <Bio bio={userInfo.bio} yearsPetting={userInfo.yearsPetting} address={userInfo.address} />
      </div>

      {console.log("📢 Modal Open State:", isModalOpen)}

      {/* ✅ Edit Profile Modal (Render Only If isOpen) */}
      {isModalOpen && (
        <>
          {console.log("🟢 Modal is Rendered in the DOM!")}
          <EditProfile
            isOpen={isModalOpen}
            onClose={closeModal}
            userData={userInfo}
            updateUser={handleSave} // ✅ Pass function to update profile
          />
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
