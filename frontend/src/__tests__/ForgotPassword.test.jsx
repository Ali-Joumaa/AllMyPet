import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgetPassword from "../components/ForgetPassword";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ForgetPassword Component", () => {
  test("renders titles and subtitle", () => {
    renderWithRouter(<ForgetPassword />);
    expect(
      screen.getByText(/Forgot your password\? No worries!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Reset Password 🐾/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Enter your email to receive a reset link/i)
    ).toBeInTheDocument();
  });

  test("renders email input and submit button", () => {
    renderWithRouter(<ForgetPassword />);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Reset Link/i })).toBeInTheDocument();
  });

  test("renders image and back to login link", () => {
    renderWithRouter(<ForgetPassword />);
    expect(screen.getByAltText("Pets")).toBeInTheDocument();

    const loginLink = screen.getByRole("link", { name: /Login/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  test("email field is required", () => {
    renderWithRouter(<ForgetPassword />);
    const input = screen.getByPlaceholderText(/Email/i);
    expect(input).toBeRequired();
  });

  test("form can be submitted (no-op)", () => {
    renderWithRouter(<ForgetPassword />);
    const form = screen.getByRole("form") || screen.getByRole("button", { name: /Send Reset Link/i }).closest("form");
    fireEvent.submit(form);
    expect(form).toBeInTheDocument(); // just asserting it doesn't crash
  });
});
