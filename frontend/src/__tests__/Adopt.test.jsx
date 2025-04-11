import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Adopt from "../components/Adopt";

// Mock dependencies
jest.mock("../components/NavBar", () => () => <div data-testid="navbar" />);
jest.mock("../components/Footer", () => () => <div data-testid="footer" />);
jest.mock("../components/Adoptionpost", () => (props) => (
  <div data-testid="adoption-post" data-id={props.data.id}>
    {props.data.petBreed}
  </div>
));
jest.mock("../components/AdoptionPostForm", () => (props) => (
  <div data-testid="adoption-form">
    <button onClick={props.onPostAdded}>Add Post</button>
  </div>
));

// Mock token with base64 payload
const mockToken = btoa(JSON.stringify({ sub: "testuser" }));

beforeEach(() => {
  localStorage.setItem("token", `header.${mockToken}.sig`);
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe("Adopt component", () => {
  test("renders NavBar and Footer", () => {
    render(<Adopt />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("fetches and displays adoption posts", async () => {
    const mockPosts = [
      { id: 1, petBreed: "Siamese" },
      { id: 2, petBreed: "Persian" },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      })
    );

    render(<Adopt />);

    expect(await screen.findByText("Siamese")).toBeInTheDocument();
    expect(screen.getByText("Persian")).toBeInTheDocument();
  });

  test("displays empty state if no posts match filter", async () => {
    const mockPosts = [{ id: 1, petBreed: "Siamese" }];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      })
    );

    render(<Adopt />);
    expect(await screen.findByText("Siamese")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search by breed...");
    fireEvent.change(searchInput, { target: { value: "Labrador" } });

    expect(await screen.findByText("No adoption posts found for this breed.")).toBeInTheDocument();
  });

  test("opens and closes the adoption form modal", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(<Adopt />);

    fireEvent.click(screen.getByText("+")); // Open modal
    expect(await screen.findByTestId("adoption-form")).toBeInTheDocument();

    fireEvent.click(screen.getByText("×")); // Close modal
    expect(await screen.queryByTestId("adoption-form")).not.toBeInTheDocument();
  });
});
