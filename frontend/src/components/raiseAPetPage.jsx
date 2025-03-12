import React from "react";
import NavBar from "./NavBar"; 
import Footer from "./Footer"; 
import RaisePet from "./raiseAPet";

function RaiseAPet() {
    return (
        <div>
            <NavBar />
            <RaisePet />
            <Footer />
        </div>
    );
}

export default RaiseAPet;