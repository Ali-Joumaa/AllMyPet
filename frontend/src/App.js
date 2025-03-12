import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import OurPetsSection from "./components/ourPetsSection";
import TopHomePage from "./components/topHomePage";
import ReviewSection from "./components/reviewSection";
import NavBar from "./components/NavBar";
import PetCardsGrid from "./components/PetCardsGrid";
import Footer from "./components/Footer";
import PetCare from "./components/petCare";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";

function HomePage() {
  return (
    <>
      <NavBar />
      <TopHomePage />
      <OurPetsSection />
      <PetCare />
      <ReviewSection />
      <PetCardsGrid />
      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Only show the home components when the user is on the home page */}
      {location.pathname === "/" && <HomePage />}

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;
