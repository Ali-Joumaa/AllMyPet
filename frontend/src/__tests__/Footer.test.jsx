import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Footer Component", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    localStorage.clear();
  });

  test("renders help, contact, and newsletter sections", () => {
    render(<Footer />);

    expect(screen.getByText(/How Can We Help/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Keep In Touch With Us/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E-mail Address/i)).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  test("navigates to /login if no token when Adopt is clicked", () => {
    render(<Footer />);

    fireEvent.click(screen.getByText("Adopt a pet"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("navigates to /adopt if token exists when Adopt is clicked", () => {
    localStorage.setItem("token", "mockToken");

    render(<Footer />);
    fireEvent.click(screen.getByText("Adopt a pet"));

    expect(mockNavigate).toHaveBeenCalledWith("/adopt");
  });

  test("renders social media icons", () => {
    render(<Footer />);
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(5); // Facebook, Pinterest, etc.
  });
});
