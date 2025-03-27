import React from "react";

const Cat = ({ name, imageUrl, description }) => {
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        height: "400px", // fixed height
        margin: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Image on top */}
      <img
        src={imageUrl}
        className="card-img-top"
        alt={name}
        style={{
          height: "200px",
          objectFit: "cover"
        }}
      />

      {/* Card body */}
      <div
        className="card-body"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div>
          <h5
            className="card-title"
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "10px"
            }}
          >
            {name}
          </h5>
          <p
            className="card-text"
            style={{
              fontSize: "0.9rem",
              color: "#555"
            }}
          >
            {description ? description : "no description"}
          </p>
        </div>

        {/* Optional Button */}
        {/* <a href="/#" className="btn btn-primary" style={{ backgroundColor: "#675BC8", border: "none" }}>
          Learn More
        </a> */}
      </div>
    </div>
  );
};

export default Cat;
