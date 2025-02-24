import React from "react";
import "./PeacefulCoexistence.css"; // Import CSS

function PeacefulCoexistence() {
  return (
    <div className="coexistence-container">
      {/* Title Section */}
      <h2 className="coexistence-title">Peaceful Coexistence</h2>
      <h3 className="coexistence-subtitle">Human & Animals</h3>

      {/* Image Section */}
      <div className="coexistence-image-container">
        <img src="/peaceful-coexistence.png" alt="Human & Animals" className="coexistence-image" />
      </div>
    </div>
  );
}

export default PeacefulCoexistence;
