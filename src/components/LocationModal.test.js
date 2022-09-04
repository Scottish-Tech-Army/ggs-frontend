/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationModal from "./LocationModal";
import { collectLocation } from "../services/locations";
import AuthProvider from "../contexts/AuthContext";

const handleCloseLocation = jest.fn();
const setLocations = jest.fn();

jest.mock("../services/locations");
const localStorageGetItem = jest.spyOn(
  Object.getPrototypeOf(window.localStorage),
  "getItem"
);
const localStorageSetItem = jest.spyOn(
  Object.getPrototypeOf(window.localStorage),
  "setItem"
);

describe("component LocationModal", () => {
  const TEST_LOCATION = {
    city: "Edinburgh",
    photos: [{ url: "https://localhost/photo.jpg" }],
    challenge: "This is the challenge text",
    county: "Edinburgh",
    longitude: -3.21329494646239,
    locationId: "edinburgh-edinburgh-testlocation",
    region: "Edinburgh",
    description: "This is the location description.",
    latitude: 55.94846683803023,
    name: "Test location name",
  };

  const OTHER_LOCATION = {
    city: "Edinburgh2",
    photos: [{ url: "https://localhost/photo.jpg" }],
    challenge: "This is the challenge text2",
    county: "Edinburgh2",
    longitude: -3.21329494646239,
    locationId: "edinburgh-edinburgh-testlocation2",
    region: "Edinburgh2",
    description: "This is the location description2.",
    latitude: 55.94846683803023,
    name: "Test location name2",
  };

  const LOCATION_WITHOUT_PHOTO = {
    city: "Edinburgh",
    photos: [],
    challenge: "This is the challenge text",
    county: "Edinburgh",
    longitude: -3.21329494646239,
    locationId: "edinburgh-edinburgh-testlocation",
    region: "Edinburgh",
    description: "This is the location description.",
    latitude: 55.94846683803023,
    name: "Test location name",
  };

  const IN_RANGE_LOCATION = { longitude: -3.213294, latitude: 55.948466 };
  const OUT_OF_RANGE_LOCATION = { longitude: -3.213294, latitude: 55.949 };

  const TEST_EMAIL = "test@example.com";

  beforeEach(() => {
    localStorageGetItem.mockReturnValue(
      JSON.stringify({
        email: TEST_EMAIL,
        name: "Test team",
      })
    );
  });

  afterAll(() => {
    localStorageGetItem.mockRestore();
    localStorageSetItem.mockRestore();
  });

  function renderWithUser(component) {
    return {
      user: userEvent.setup(),
      ...render(<AuthProvider>{component}</AuthProvider>),
    };
  }

  it("show location information", () => {
    renderWithUser(
      <LocationModal
        selectedLocation={TEST_LOCATION}
        handleCloseLocation={handleCloseLocation}
        setLocations={setLocations}
        userLatLong={IN_RANGE_LOCATION}
      />
    );

    const modal = document.querySelector(".modal-dialog");
    expect(modal).toMatchSnapshot();
    expect(modal).toHaveTextContent("Test location name");
    expect(modal).toHaveTextContent("Edinburgh");
    expect(modal).toHaveTextContent("This is the location description.");
  });

  it("show out of range location", () => {
    renderWithUser(
      <LocationModal
        selectedLocation={TEST_LOCATION}
        handleCloseLocation={handleCloseLocation}
        setLocations={setLocations}
        userLatLong={OUT_OF_RANGE_LOCATION}
      />
    );

    const modal = document.querySelector(".modal-dialog");

    const button = screen.getByRole("button", {
      name: "Please come closer to this location",
    });
    expect(button).toBeDisabled();
    expect(modal).not.toHaveTextContent("This is the challenge text");
  });

  it("show in range uncollected location", () => {
    renderWithUser(
      <LocationModal
        selectedLocation={TEST_LOCATION}
        handleCloseLocation={handleCloseLocation}
        setLocations={setLocations}
        userLatLong={IN_RANGE_LOCATION}
      />
    );

    const modal = document.querySelector(".modal-dialog");

    const button = screen.getByRole("button", { name: "Tap to reveal challenge" });
    expect(button).not.toBeDisabled();
    expect(modal).not.toHaveTextContent("This is the challenge text");
  });

  it("show in range collected location", () => {
    renderWithUser(
      <LocationModal
        selectedLocation={{ ...TEST_LOCATION, collected: true }}
        handleCloseLocation={handleCloseLocation}
        setLocations={setLocations}
        userLatLong={IN_RANGE_LOCATION}
      />
    );

    const modal = document.querySelector(".modal-dialog");
    expect(modal).toHaveTextContent("This is the challenge text");

    expect(
      screen.queryByRole("button", { name: "Tap to reveal challenge" })
    ).toBeNull();
  });

  it("collect location", async () => {
    collectLocation.mockResolvedValue({ ok: true });

    const { user } = renderWithUser(
      <LocationModal
        selectedLocation={TEST_LOCATION}
        handleCloseLocation={handleCloseLocation}
        setLocations={setLocations}
        userLatLong={IN_RANGE_LOCATION}
      />
    );

    await user.click(screen.getByRole("button", { name: "Tap to reveal challenge" }));

    expect(collectLocation).toHaveBeenCalledTimes(1);
    expect(collectLocation).toHaveBeenCalledWith(
      TEST_EMAIL,
      "edinburgh-edinburgh-testlocation"
    );

    expect(setLocations).toHaveBeenCalledTimes(1);
    const setLocationsFilter = setLocations.mock.calls[0][0];
    expect(
      setLocationsFilter([OTHER_LOCATION, TEST_LOCATION, OTHER_LOCATION])
    ).toEqual([
      OTHER_LOCATION,
      { ...TEST_LOCATION, collected: true },
      OTHER_LOCATION,
    ]);
  });

  it("placeholder image", async () => {
    collectLocation.mockResolvedValue({ ok: true });

    renderWithUser(
      <LocationModal
        selectedLocation={LOCATION_WITHOUT_PHOTO}
        handleCloseLocation={handleCloseLocation}
        setLocations={setLocations}
        userLatLong={IN_RANGE_LOCATION}
      />
    );

    const modal = document.querySelector(".modal-dialog");

    expect(screen.getByAltText("no image available")).toHaveAttribute(
      "src",
      "image-coming-soon.png"
    );
    expect(modal).toHaveTextContent("Take a photo");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "mailto:web@girlguiding-scot.org.uk"
    );
  });

  it("fire close on clicking close button", async () => {
    const { user } = renderWithUser(
      <LocationModal
        selectedLocation={TEST_LOCATION}
        handleCloseLocation={handleCloseLocation}
        setLocations={setLocations}
        userLatLong={IN_RANGE_LOCATION}
      />
    );

    await user.click(screen.getByLabelText("Close"));

    expect(handleCloseLocation).toHaveBeenCalledTimes(1);
  });
});
