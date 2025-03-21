import React, { useState, useEffect } from "react";
import Cat from "./Cat";
import "./raiseAPet.css";
import "./topHomePage.css";
import DogAndCatImage from "../images/DogAndCat.svg";

const RaiseAPet = () => {
  const [location, setLocation] = useState("");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countryData, setCountryData] = useState({});
  const [catBreeds, setCatBreeds] = useState([]);

  // Load the JSON file and cat breeds data on mount
  useEffect(() => {
    fetch("/countries_pets.json")
      .then((response) => response.json())
      .then((data) => setCountryData(data))
      .catch((err) => console.error("Error loading pet data:", err));

    console.log("Using Cat API Key:", process.env.REACT_APP_CAT_API_KEY);
    fetch("https://api.thedogapi.com/v1/breeds", {
      headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
    })
      .then((response) => response.json())
      .then((data) => setCatBreeds(data))
      .catch((err) => console.error("Error loading cat breeds:", err));
  }, []);

  const fetchCatImage = async (breed) => {
    // Find breed ID
    const matchedBreed = catBreeds.find((b) => b.name.toLowerCase() === breed.toLowerCase());
    console.log("Matched Breed ID:", matchedBreed ? matchedBreed.id : "Not Found");
    if (!matchedBreed) return "default_image_url.jpg";

    try {
      // Fetch cat image using breed ID
      const response = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${matchedBreed.id}`, {
        headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
      });
      if (!response.ok) throw new Error("Failed to fetch cat image.");
      const data = await response.json();
      return data.length > 0 ? data[0].url || "default_image_url.jpg" : "default_image_url.jpg";
    } catch {
      return "default_image_url.jpg";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.trim()) {
      alert("Please enter a location.");
      return;
    }

    setLoading(true);
    setError(null);
    setPets([]);

    try {
      const countryName = location.trim();
      if (!countryData[countryName]) {
        setError("No data found for this country.");
      } else {
        const breedNames = countryData[countryName].suitable_breeds;
        const breedData = await Promise.all(
          breedNames.map(async (breed) => {
            return {
              name: breed,
              imageUrl: await fetchCatImage(breed),
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
                  <h2 className="text-center mb-4">Enter Your Location</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="e.g., Canada"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
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
                  <Cat name={pet.name} imageUrl={pet.imageUrl} />
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
