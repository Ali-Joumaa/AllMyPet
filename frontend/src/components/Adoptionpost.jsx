import React from "react";
import "./Adoptionpost.css";

const AdoptionPost = ({data}) => {
  console.log(data.user.profilePictureURL);
  // console.log(data.imageURL);
  return (
    <div className="adoption-card">
      <div className="adoption-header">
        <div className="adoption-profile">
          <img
            src={data.user.userProfileURL}

            alt="Profile"
            className="adoption-profile-pic"
          />
          <div className="adoption-user-info">
            <h2>{data.user.username}</h2>
            <p className="adoption-date">{data.postedDate}</p>
          </div>
        </div>
        <button className="adoption-available-btn">{data.status}</button>
      </div>

      <div className="adoption-title-container">
        <h1 className="adoption-title">{data.title}</h1>
        <div className="adoption-toggle-container">
          <label className="adoption-toggle">
            {/* <input type="checkbox" defaultChecked={data.toggleChecked} /> */}
            <img
            src={data.imageUrl}

            alt="Profile"
            className="adoption-p et-pic"
          />
            {/* <span className="adoption-slider"></span> */}
          </label>
          <span className="toggle-label">{data.petName}</span>
        </div>
      </div>

      <p className="adoption-description">
      {data.description}
      </p>
      
      <p className="adoption-type">Adoption Type : {data.adoptionType}</p>
    </div>
  );
};

export default AdoptionPost;
