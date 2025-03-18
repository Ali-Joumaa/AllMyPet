
import React from "react";
import NavBar from "./NavBar"; 
import Footer from "./Footer"; 
import OurPetsSection from "./ourPetsSection";


function Adopt() {
    return (
        <div>
            <NavBar />
            <OurPetsSection header="Pets Offered for Adoption" />
            
            <Footer />
        </div>
    );
}

export default Adopt;
