import { useEffect, useState, useRef } from "react";
import PetCardHome from "./PetCardHome";
import "./ourPetsSection.css";
import axios from "axios";

export default function OurPetsSection({ header }) {
  const [petCards, setPetCards] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const visibleCount = 4;

  // Fetch cards
  useEffect(() => {
    axios.get("http://localhost:5555/api/pets/all")
      .then(res => setPetCards(res.data))
      .catch(err => console.error("Failed to fetch pet cards:", err));
  }, []);

  // Auto-slide
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [petCards]);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 4000);
  };

  const handleNext = () => {
    if (petCards.length <= visibleCount) return;
    setTransitioning(true);
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % petCards.length);
      setTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    if (petCards.length <= visibleCount) return;
    setTransitioning(true);
    setTimeout(() => {
      setStartIndex((prev) =>
        (prev - 1 + petCards.length) % petCards.length
      );
      setTransitioning(false);
    }, 300);
  };

  const visibleCards = [];
  if (petCards.length > 0) {
    for (let i = 0; i < visibleCount; i++) {
      const card = petCards[(startIndex + i) % petCards.length];
      if (card) visibleCards.push(card);
    }
  }

  return (
    <div className="container">
      <h1 className="text-center loving-text">
        {header || "Take a Look at Some of Our Pets"}
      </h1>

      <div className="carousel-container">
        {/* <button className="arrow-btn left" onClick={handlePrev}>
          ◀
        </button> */}

        <div className={`card-row ${transitioning ? "fade-transition" : ""}`}>
          {visibleCards.map((card, index) => (
            <div key={index} className="card-wrapper">
              <PetCardHome
                petId={card.petId}
                petName={card.name}
                petBreed={card.breed}
                petAge={card.age}
                petGender={card.sex}
                petLocation={card.location}
                petImage={card.petPhoto}
                petSize={card.species}
                petDescription={card.description}
                isFavorite={false}
              />
            </div>
          ))}
        </div>

        {/* <button className="arrow-btn right" onClick={handleNext}>
          ▶
        </button> */}
      </div>

      {petCards.length === 0 && (
        <p style={{ marginTop: "1rem" }}>No pets available to display.</p>
      )}
    </div>
  );
}
