import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditProfile from "../components/EditProfile";
import axios from "axios";

jest.mock("axios");

const mockUserData = {
  profilePictureURL: "https://example.com/image.jpg",
  bio: "Loves cats",
  yearsPetting: "3",
  address: "Beirut"
};

beforeEach(() => {
  localStorage.setItem("token", "mockToken");
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe("EditProfile Component", () => {
  test("does not render if isOpen is false", () => {
    render(
      <EditProfile
        isOpen={false}
        onClose={jest.fn()}
        userData={mockUserData}
        updateUser={jest.fn()}
      />
    );

    expect(screen.queryByText("Edit Profile")).not.toBeInTheDocument();
  });

  test("renders form with initial user data when isOpen is true", () => {
    render(
      <EditProfile
        isOpen={true}
        onClose={jest.fn()}
        userData={mockUserData}
        updateUser={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/Profile Picture URL:/i)).toHaveValue(mockUserData.profilePictureURL);
    expect(screen.getByLabelText(/Bio:/i)).toHaveValue(mockUserData.bio);
    expect(screen.getByLabelText(/Years of Petting:/i)).toHaveValue(Number(mockUserData.yearsPetting));
    expect(screen.getByLabelText(/Address:/i)).toHaveValue(mockUserData.address);
    expect(screen.getByAltText(/Profile Preview/i)).toHaveAttribute("src", mockUserData.profilePictureURL);
  });

  test("updates preview image when URL input changes", () => {
    render(
      <EditProfile
        isOpen={true}
        onClose={jest.fn()}
        userData={mockUserData}
        updateUser={jest.fn()}
      />
    );

    const input = screen.getByLabelText(/Profile Picture URL:/i);
    fireEvent.change(input, { target: { name: "profilePicture", value: "https://new.com/img.png" } });

    const img = screen.getByAltText("Profile Preview");
    expect(img).toHaveAttribute("src", "https://new.com/img.png");
  });

  test("submits form and calls updateUser + onClose", async () => {
    const updatedUser = { ...mockUserData, bio: "Updated Bio" };
    const updateUserMock = jest.fn();
    const onCloseMock = jest.fn();

    axios.put.mockResolvedValueOnce({ data: updatedUser });

    render(
      <EditProfile
        isOpen={true}
        onClose={onCloseMock}
        userData={mockUserData}
        updateUser={updateUserMock}
      />
    );

    const bioInput = screen.getByLabelText(/Bio:/i);
    fireEvent.change(bioInput, { target: { value: "Updated Bio" } });

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
    });
  });

  test("shows alert if no token is found", () => {
    localStorage.removeItem("token");
    window.alert = jest.fn();

    render(
      <EditProfile
        isOpen={true}
        onClose={jest.fn()}
        userData={mockUserData}
        updateUser={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));
    expect(window.alert).toHaveBeenCalledWith("No token found. Please log in again.");
  });
});
