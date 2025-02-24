import React from "react";
import "./CoexistenceSection.css"; // Import CSS
import PeacefulCoexistence from "./PeacefulCoexistence";
import PetCardsGrid from "./PetCardsGrid";

function CoexistenceSection() {
  return (
    <div className="coexistence-section">
      {/* Left - Image & Title */}
      <div className="coexistence-left">
        <PeacefulCoexistence />
      </div>

      {/* Right - Cards Grid */}
      <div className="coexistence-right">
        <PetCardsGrid />
      </div>
    </div>
  );
}

export default CoexistenceSection;
