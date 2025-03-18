import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"; 
import Footer from "./Footer"; 
import OurPetsSection from "./ourPetsSection";
import PetCardsGrid from "./PetCardsGrid";
import TopHomePage from "./topHomePage";
import ReviewSection from "./reviewSection";
import PetCare from "./petCare";
import PetAdoptionSteps from "./PetAdoptionSteps";
import PetNewsSection from "./petNewsSection";

function Home() {
    const [user, setUser] = useState(null);
    const [isGuest, setIsGuest] = useState(true); // Flag to check if user is a guest
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsGuest(true); // No token, user is a guest
            return;
        }

        // Fetch user data if token exists
        fetch("http://localhost:5555/users/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Invalid token");
            }
            return res.json();
        })
        .then((data) => {
            setUser(data);
            setIsGuest(false); // User is logged in
        })
        .catch(() => {
            localStorage.removeItem("token"); // Remove invalid token
            setIsGuest(true); // Mark user as a guest
        });
    }, []);

    return (
        <div>
            <NavBar user={user} isGuest={isGuest} /> {/* Pass both user data and guest flag */}
            <TopHomePage />
            <OurPetsSection />
            <PetAdoptionSteps/>
            <PetNewsSection/>
            <PetCare />
            <ReviewSection />
            <PetCardsGrid/>
            <Footer />
        </div>
    );
}

export default Home;
