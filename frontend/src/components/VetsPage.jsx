import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./VetsPage.css";
import VetCardSlider from "./VetCardSlider";

export default function VetsPage() {
  // State to hold fetched vets
  const [vets, setVets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/vets")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched vets:", data);
        if (Array.isArray(data)) {
          // Transform the data to match VetCard fields
          const transformedVets = data.map((vet) => ({
            name: vet.firstName + " " + vet.lastName,
            // If you'd like to display experience, location, or contact:
            expYears: vet.expYears || 0,
            location: vet.location || "N/A",
            contact: vet.phoneNumber || "N/A",
            image: vet.profilePicture
          }));
          setVets(transformedVets);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((err) => console.error("Error fetching vets:", err));
  }, []);

  return (
    <>
      <NavBar />
      <div className="vets-container">
        <h1 className="vets-header">Available Veterinarians</h1>
        {/* Pass the fetched `vets` to VetCardSlider */}
        <VetCardSlider vets={vets} />
      </div>
      <Footer />
    </>
  );
}