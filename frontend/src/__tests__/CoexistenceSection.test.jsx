import React from "react";
import { render, screen } from "@testing-library/react";
import CoexistenceSection from "../components/CoexistenceSection";

// Mock PetCardsGrid
jest.mock("../components/PetCardsGrid", () => () => (
  <div data-testid="pet-cards-grid">Pet Cards Grid Mock</div>
));

describe("CoexistenceSection Component", () => {
  test("renders PetCardsGrid component", () => {
    render(<CoexistenceSection />);
    expect(screen.getByTestId("pet-cards-grid")).toBeInTheDocument();
    expect(screen.getByText("Pet Cards Grid Mock")).toBeInTheDocument();
  });
});
