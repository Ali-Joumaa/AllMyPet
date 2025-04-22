import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./VetsPage.css";
import VetCardSlider from "./VetCardSlider";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

export default function VetsPage() {
  const [vets, setVets] = useState([]);
  const navigate = useNavigate();

  const handleVetClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/vets");
    }
  };

  useEffect(() => {
    fetch("http://localhost:5555/vets/approved")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched vets:", data);
        if (Array.isArray(data)) {
          const transformedVets = data.map((vet) => ({
            name: vet.firstName + " " + vet.lastName,
            expYears: vet.expYears || 0,
            location: vet.location || "N/A",
            contact: vet.phoneNumber || "N/A",
            image: vet.profilePicture,
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

     

      <div className="vets-page-wrapper">
        <div className="vets-container">
          <h1 className="vets-header">Available Veterinarians</h1>
          <Box sx={{ textAlign: "center", mt: 4 }}>
        <Link to="/addvet" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "12px",
              boxShadow: 3,
              textTransform: "none",
              fontSize: "1.1rem",
              backgroundColor:"#9990DA",
            }}
          >
             Add a Vet
          </Button>
        </Link>
      </Box>
          <VetCardSlider vets={vets} />
        </div>
      </div>

      <Footer />
    </>
  );
}
