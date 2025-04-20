import React from "react";
import { render, screen } from "@testing-library/react";
import Bio from "../components/bio";

describe("Bio Component", () => {
  test("renders all passed props correctly", () => {
    render(<Bio bio="Animal lover and vet tech" address="Beirut" yearsPetting={5} />);

    expect(screen.getByText("Beirut")).toBeInTheDocument();
    expect(screen.getByText("5 years of petting")).toBeInTheDocument();
    expect(screen.getByText("Animal lover and vet tech")).toBeInTheDocument();

    // Icon checks
    expect(screen.getByAltText("Paw Icon")).toBeInTheDocument();
  });

  test("renders fallback values when props are missing", () => {
    render(<Bio />);

    expect(screen.getByText("address not set")).toBeInTheDocument();
    expect(screen.getByText("Years of petting not set")).toBeInTheDocument();
    expect(screen.getByText("This user hasn't written a bio yet.")).toBeInTheDocument();
  });

  test("renders address icon", () => {
    render(<Bio address="Paris" />);

  });
});
