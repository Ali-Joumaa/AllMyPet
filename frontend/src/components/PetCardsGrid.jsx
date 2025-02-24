import React from "react";
import "./PetCardsGrid.css"; // Import CSS
import PetInfoCard from "./PetInfoCard";
import PetEmotionCard from "./PetEmotionCard"; // Emotional pet-related cards

function PetCardsGrid() {
  return (
    <div className="cards-container">
      {/* Left Column */}
      <div className="left-column">
        {/* <EmotionalCard /> */}
        <PetEmotionCard
          title="Emotional relationship"
          text="The emotional bond between cats and humans is deeply rooted in felines' unconditional love and companionship."
          image="/Cat1.png" // Path to cat image
        />
        {/* <ChildrenAndPetsCard /> */}
           <PetInfoCard
          title="Children and pets"
          text="Pets establish emotional attachments to children, and the relationship turns out positive in terms of affective aspects, in reinforcement of the child’s personality."
          image="/Dog2.png" // Path to dog image
        />
      </div>

      {/* Right Column */}
      <div className="right-column">
        {/* <CommunicationCard /> */}
        <PetInfoCard
          title="Communication"
          text="Animals can communicate better with people in such conditions, as verbal communication is replaced by non-verbal."
          image="/Dog1.png" // Path to another dog image
        />
        {/* <HealthCard /> */}
        <PetEmotionCard
          title="Health"
          text="Some studies suggest that owning a pet can lower blood pressure and improve heart health."
          image="/Cat2.png" // Path to another cat image
        />
      </div>
    </div>
  );
}

export default PetCardsGrid;
