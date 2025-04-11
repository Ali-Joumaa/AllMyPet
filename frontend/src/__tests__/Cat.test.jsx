import React from "react";
import { render, screen } from "@testing-library/react";
import Cat from "../components/Cat"; // adjust this based on where Cat.jsx is

describe("Cat Component", () => {
  const defaultProps = {
    name: "Whiskers",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    description: "A curious little cat"
  };

  test("renders the cat name", () => {
    render(<Cat {...defaultProps} />);
    expect(screen.getByText("Whiskers")).toBeInTheDocument();
  });

  test("renders the image with correct src and alt", () => {
    render(<Cat {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", defaultProps.imageUrl);
    expect(img).toHaveAttribute("alt", defaultProps.name);
  });

  test("renders the description text", () => {
    render(<Cat {...defaultProps} />);
    expect(screen.getByText("A curious little cat")).toBeInTheDocument();
  });

  test("renders default description when none is provided", () => {
    const propsWithoutDesc = {
      name: "Shadow",
      imageUrl: "https://example.com/cat2.jpg"
    };
    render(<Cat {...propsWithoutDesc} />);
    expect(screen.getByText("no description")).toBeInTheDocument();
  });
});
