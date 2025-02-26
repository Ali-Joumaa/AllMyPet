import React from "react";
import NavBar from "./NavBar"; // Import the NavBar component
import Footer from "./Footer"; // Import Footer component
import OurPetsSection from "./ourPetsSection";
import PetCardsGrid from "./PetCardsGrid";



function Home() {
    return (
        <div>

            <NavBar />
            <OurPetsSection/>
            <div style={{ marginBottom: "20px" }}></div> {/* Space between components */}
            <PetCardsGrid />

            <Footer />
        </div>
    );
}

export default Home;
