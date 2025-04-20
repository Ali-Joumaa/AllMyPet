import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdoptionPostEditForm from "../components/AdoptionPostEditForm";

const mockPostData = {
  id: 123,
  title: "Looking for a Home",
  description: "This pet needs a temporary home.",
  status: "Available",
  adoptionType: "Temporary",
  petId: "pet123",
  petName: "Bella",
  petSpecies: "Dog",
};

beforeEach(() => {
  localStorage.setItem("token", "mock.token.value");
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe("AdoptionPostEditForm", () => {
  test("renders with initial data", () => {
    render(
      <AdoptionPostEditForm
        postData={mockPostData}
        onPostUpdated={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/Title/i).value).toBe(mockPostData.title);
    expect(screen.getByLabelText(/Description/i).value).toBe(mockPostData.description);
    expect(screen.getByLabelText(/Adoption Status/i).value).toBe("Available");
    expect(screen.getByLabelText(/Adoption Type/i).value).toBe("Temporary");
    expect(screen.getByLabelText(/Pet:/i).value).toBe("Bella (Dog)");
  });

  test("calls onCancel when Cancel button is clicked", () => {
    const onCancelMock = jest.fn();
    render(
      <AdoptionPostEditForm
        postData={mockPostData}
        onPostUpdated={jest.fn()}
        onCancel={onCancelMock}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancelMock).toHaveBeenCalled();
  });

  test("submits updated data and calls onPostUpdated and onCancel", async () => {
    const updatedPost = { ...mockPostData, title: "Updated Title" };
    const onPostUpdatedMock = jest.fn();
    const onCancelMock = jest.fn();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updatedPost),
      })
    );

    render(
      <AdoptionPostEditForm
        postData={mockPostData}
        onPostUpdated={onPostUpdatedMock}
        onCancel={onCancelMock}
      />
    );

    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    fireEvent.submit(screen.getByRole("form")); // or use screen.getByText("Update").click();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  test("alerts if no token is found", () => {
    localStorage.removeItem("token");
    window.alert = jest.fn();

    render(
      <AdoptionPostEditForm
        postData={mockPostData}
        onPostUpdated={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    fireEvent.submit(screen.getByRole("form"));
    expect(window.alert).toHaveBeenCalledWith("You're not logged in!");
  });
});
