import React, { useState, useEffect } from "react";
import Cat from "./Cat";
import "./raiseAPet.css";
import "./topHomePage.css";
import DogAndCatImage from "../images/raiseAPet.png";

const RaiseAPet = () => {
  const [location, setLocation] = useState("");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countryData, setCountryData] = useState({});
  const [catBreeds, setCatBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [animalType, setAnimalType] = useState("both");

  useEffect(() => {
    fetch("/all_countries_pets_by_climate.json")
      .then((response) => response.json())
      .then((data) => setCountryData(data))
      .catch((err) => console.error("Error loading pet data:", err));

    fetch("https://api.thecatapi.com/v1/breeds", {
      headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
    })
      .then((response) => response.json())
      .then((data) => setCatBreeds(data))
      .catch((err) => console.error("Error loading cat breeds:", err));

    fetch("https://api.thedogapi.com/v1/breeds", {
      headers: { "x-api-key": process.env.REACT_APP_DOG_API_KEY },
    })
      .then((response) => response.json())
      .then((data) => setDogBreeds(data))
      .catch((err) => console.error("Error loading dog breeds:", err));
  }, []);

  const fetchImage = async (type, breedId, breedName = "") => {
    if (type === "dog") {
      const formatted = breedName.toLowerCase().replace(/\s+/g, "/");
      const url = `https://dog.ceo/api/breed/${formatted}/images/random`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data?.status === "success" && data?.message) {
          return data.message;
        } else {
          const fallbackRes = await fetch("https://dog.ceo/api/breeds/image/random");
          const fallbackData = await fallbackRes.json();
          return fallbackData?.message || "default_dog.jpg";
        }
      } catch {
        return "default_dog.jpg";
      }
    } else {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
          headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
        });
        const data = await response.json();
        return data.length > 0 ? data[0].url : "default_cat.jpg";
      } catch {
        return "default_cat.jpg";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (animalType !== "dog" && !location.trim()) {
      alert("Please select a location.");
      return;
    }

    setLoading(true);
    setError(null);
    setPets([]);

    try {
      if (animalType === "dog") {
        const res = await fetch("/random_pet_dogs_filtered.json");
        const dogList = await res.json();

        const dogData = await Promise.all(
          dogList.map(async (dog) => {
            const imageUrl = await fetchImage("dog", null, dog.name);
            return {
              name: dog.name,
              imageUrl,
              description: `${dog.name} is a loyal and playful breed.`,
            };
          })
        );

        setPets(dogData);
        return;
      }

      let countryName = location.trim();
      countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

      if (!countryData[countryName]) {
        setError("No data found for this country.");
      } else {
        const breedList = countryData[countryName].suitable_breeds;
        const filteredList = animalType === "cat"
          ? breedList.filter((b) => b.type === "cat")
          : breedList;

        const breedData = await Promise.all(
          filteredList.map(async (breed) => {
            const imageUrl = await fetchImage(breed.type, breed.id, breed.name);
            const breedInfo =
              breed.type === "cat"
                ? catBreeds.find((b) => b.id === breed.id)
                : dogBreeds.find((b) => b.id === breed.id);

            const description = breedInfo?.temperament
              ? `${breed.name} is ${breedInfo.temperament}`
              : "Temperament information is not available for this breed.";

            return {
              name: breed.name,
              description,
              imageUrl,
            };
          })
        );
        setPets(breedData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="title-box">
        <span className="loving-text">
          Raise <span style={{ color: "#2E256F" }}>Pets</span>
        </span>
      </div>

      <div className="center-container">
        <div className="raise-a-pet">
          <div className="top-home-container">
            <div className="top-home-text">
              <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
                  <h2 className="text-center mb-4">Select Your Country</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">Country</label>

                      {Object.keys(countryData).length > 0 ? (
                        <>
                          <input
                            list="countries"
                            className="form-control"
                            id="location"
                            placeholder="Start typing a country name..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required={animalType !== "dog"}
                          />
                          <datalist id="countries">
                            {Object.keys(countryData).map((country, index) => (
                              <option key={index} value={country} />
                            ))}
                          </datalist>
                        </>
                      ) : (
                        <p>Loading countries...</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="animalType" className="form-label">Filter by Animal</label>
                      <select
                        id="animalType"
                        className="form-select"
                        value={animalType}
                        onChange={(e) => setAnimalType(e.target.value)}
                      >
                        <option value="both">Both</option>
                        <option value="cat">Cats Only</option>
                        <option value="dog">Dogs Only</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="top-home-image">
              <img src={DogAndCatImage} alt="Dog and Cat" />
            </div>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <div className="row">
            {pets.length > 0 ? (
              pets.map((pet, index) => (
                <div className="col-md-3 mb-4" key={index}>
                  <Cat name={pet.name} description={pet.description} imageUrl={pet.imageUrl} />
                </div>
              ))
            ) : (
              !loading && <p className="text-center">No pets found for this location.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiseAPet;
