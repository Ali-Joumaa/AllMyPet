import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RaiseAPet from "../components/raiseAPet";

// Mock Cat component to simplify test output
jest.mock("../components/Cat", () => ({ name, imageUrl, description }) => (
  <div data-testid="mock-cat">
    <p>{name}</p>
    <p>{description}</p>
    <img src={imageUrl} alt={name} />
  </div>
));

// Stub image import to avoid asset errors
jest.mock("../images/raiseAPet.png", () => "dogcat.png");

describe("RaiseAPet Component", () => {
  beforeEach(() => {
    // Mock all fetch calls
    global.fetch = jest.fn((url) => {
      if (url.includes("all_countries_pets_by_climate.json")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              Lebanon: {
                suitable_breeds: [
                  { name: "Abyssinian", type: "cat", id: "abys" },
                  { name: "Golden Retriever", type: "dog", id: 1 },
                ],
              },
            }),
        });
      }
      if (url.includes("thecatapi.com")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              { id: "abys", name: "Abyssinian", temperament: "Energetic, Loyal" },
            ]),
        });
      }
      if (url.includes("thedogapi.com")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              { id: 1, name: "Golden Retriever", temperament: "Friendly, Active" },
            ]),
        });
      }
      if (url.includes("dog.ceo")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              status: "success",
              message: "https://dog.ceo/image.jpg",
            }),
        });
      }
      if (url.includes("random_pet_dogs_filtered.json")) {
        return Promise.resolve({
          json: () => Promise.resolve([{ name: "Poodle" }]),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fetch.mockClear();
  });

  test("renders core UI elements", async () => {
    render(<RaiseAPet />);
    expect(screen.getByText(/Raise/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Filter by Animal/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalled()); // Wait for initial useEffect
  });

  test("shows fallback message when no pets match and not loading", async () => {
    render(<RaiseAPet />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(await screen.findByText("No pets found for this location.")).toBeInTheDocument();
  });

  test("submits form for cats and shows results", async () => {
    render(<RaiseAPet />);

    await screen.findByLabelText(/Country/i);

    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: "Lebanon" },
    });

    fireEvent.change(screen.getByLabelText(/Filter by Animal/i), {
      target: { value: "cat" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const cat = await screen.findByText("Abyssinian");
    expect(cat).toBeInTheDocument();
    expect(screen.getByText(/Energetic, Loyal/)).toBeInTheDocument();
  });

  test("submits form for dogs only and renders dog result", async () => {
    render(<RaiseAPet />);
    await screen.findByLabelText(/Filter by Animal/i);

    fireEvent.change(screen.getByLabelText(/Filter by Animal/i), {
      target: { value: "dog" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const dog = await screen.findByText("Poodle");
    expect(dog).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-cat")).toHaveLength(1);
  });
});
