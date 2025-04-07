import { useEffect, useState } from "react";
import PetCard from "./petCard";
import "./ourPetsSection.css";
import "./style.css";
import axios from "axios";

export default function OurPetsSection({ header }) {
  const [petCards, setPetCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");
  const cardsPerPage = 4;

  useEffect(() => {
    axios.get("http://localhost:5555/api/pets/all")
      .then(res => setPetCards(res.data))
      .catch(err => console.error("Failed to fetch pet cards:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection((prev) => (prev === "left" ? "right" : "left"));

      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + cardsPerPage) % petCards.length;
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [petCards]);

  const visibleCards = petCards.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <div className={`container slide-${slideDirection}`}>
      <h1 className="text-center loving-text">
        {header || "Take a Look at Some of Our Pets"}
      </h1>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {visibleCards.map((card, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
              <PetCard
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
      </div>
    </div>
  );
}
