
import React from "react";
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
    return (
        <div>
            <NavBar />
            <TopHomePage />
            <OurPetsSection />
            <PetAdoptionSteps/>
            <PetNewsSection/>
            <PetCare />
            <ReviewSection />
            <PetCardsGrid />
            <Footer />
        </div>
    );
}

export default Home;
