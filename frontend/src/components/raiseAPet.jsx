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

  useEffect(() => {
    // Load country-pet mapping
    fetch("/all_countries_pets_by_climate.json")
      .then((response) => response.json())
      .then((data) => setCountryData(data))
      .catch((err) => console.error("Error loading pet data:", err));

    // Load cat breeds
    fetch("https://api.thecatapi.com/v1/breeds", {
      headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
    })
      .then((response) => response.json())
      .then((data) => setCatBreeds(data))
      .catch((err) => console.error("Error loading cat breeds:", err));

    // Load dog breeds
    fetch("https://api.thedogapi.com/v1/breeds", {
      headers: { "x-api-key": process.env.REACT_APP_DOG_API_KEY },
    })
      .then((response) => response.json())
      .then((data) => setDogBreeds(data))
      .catch((err) => console.error("Error loading dog breeds:", err));
  }, []);

  const fetchImage = async (type, breedId) => {
    const apiUrl =
      type === "cat"
        ? `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
        : `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}`;

    const apiKey =
      type === "cat"
        ? process.env.REACT_APP_CAT_API_KEY
        : process.env.REACT_APP_DOG_API_KEY;

    try {
      const response = await fetch(apiUrl, {
        headers: { "x-api-key": apiKey },
      });
      if (!response.ok) throw new Error("Failed to fetch image.");
      const data = await response.json();
      return data.length > 0 ? data[0].url || "default_image_url.jpg" : "default_image_url.jpg";
    } catch {
      return "default_image_url.jpg";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.trim()) {
      alert("Please select a location.");
      return;
    }

    setLoading(true);
    setError(null);
    setPets([]);

    try {
      let countryName = location.trim();
      countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

      if (!countryData[countryName]) {
        setError("No data found for this country.");
      } else {
        const breedList = countryData[countryName].suitable_breeds;
        const breedData = await Promise.all(
          breedList.map(async (breed) => {
            const imageUrl = await fetchImage(breed.type, breed.id);
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
                            required
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
