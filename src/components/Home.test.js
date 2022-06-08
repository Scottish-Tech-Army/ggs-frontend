//import { render, screen } from "@testing-library/react";
//import Home from "./Home";

describe("Home component elements", () => {
  /* userRangeCheck and supporting helpers converted to vanilla js
   */
  // Update currently viewed location's longitude
  let locLng = "";

  // Update currently viewed location's latitude
  let locLat = "";

  // Update user's longitude
  let myLng = "";

  // Update user's latitude
  let myLat = "";

  // get user coordinates
  /* if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      //console.log("Geolocation available");
      //console.log("Latitude: " + position.coords.latitude);
      //console.log("Longitude: " + position.coords.longitude);
      myLng = position.coords.longitude;
      myLat = position.coords.latitude;
      try {
        if (isNaN(myLng) || isNaN(myLat))
          throw "Please turn on location tracking";
      } catch (error) {
        console.log(error);
      }
    });
  } else {
    //console.log("Geolocation is not supported by this browser.");
    myLng = "";
    myLat = "";
  }
 */

  /* function setEmptyCoords() {
    myLng = "";
    myLat = "";
    if (myLng == "" || myLat == "") {
      throw new Error("Please turn on location tracking");
    }
  } */

  const locationData = {
    id: 2,
    name: "Grey Friars Bobby Statue",
    description:
      "Greyfriars Bobby (4 May 1855 – 14 January 1872) was a Skye Terrier who became known in 19th-century Edinburgh for spending 14 years guarding the grave of his owner until he died on 14 January 1872. The story continues to be well known in Scotland, through several books and films.",
    latitude: 55.946873,
    longitude: -3.191229,
    area: "Edinburgh",
    collected: false,
    photos: [
      {
        id: 2,
        url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Greyfriars-bobby-edin.jpg",
        isMain: true,
      },
    ],
  };
  locLng = locationData.longitude;
  locLat = locationData.latitude;

  // Change this as needed for coordinate distance from landmark. Note 0.00001 is approx equal to 11 metres.
  const locTolerance = 0.00001;
  // Adapt the collecting button depending on user's proximity to the landmark location
  // and the collection status of the landmark location
  let collectButtonText = "Please come closer to this location"; // default button text
  let isOutOfRange = true;
  const userRangeCheck = () => {
    if (myLng == "" || myLat == "") {
      //window.alert("Please turn on location tracking"); // something the test suite cannot print out
      throw new Error("Please turn on location tracking");
    }
    else {
      if (
        locLng >= myLng - locTolerance &&
        locLat >= myLat - locTolerance &&
        locLng <= myLng + locTolerance &&
        locLat <= myLat + locTolerance
      ) {
        isOutOfRange = false;
        collectButtonText = "Start Exploring"; // text when user in range
        //console.log("Location coords: " + locLat + "" + locLng);
        console.log("Latitude: " + myLat);
        console.log("Longitude: " + myLng);
      } else {
        isOutOfRange = true;
        collectButtonText = "Please come closer to this location"; // text when user not in range
        //console.log("User is out of range");
      }
    }
  };

  test("does not call user range check if myLat and myLng are not valid 6 digit or longer numbers", () => {
    // Arrange
    let promise = new Promise((resolve, reject) => {
      myLat = "";
      myLng = "";
      if (myLat !== "" && myLng !== "" && myLat.toString().length>= 6 && myLng.toString().length>= 6) {
        resolve("OK");
      } else {
        reject("No device coords");
      }
    });
    promise.then(
      function (value) {
        console.log(value);
        userRangeCheck();
      },
      function (error) {
        console.log(error);
      }
    );
    // Act
    // .. nothing

    // Assert
    expect(promise).rejects;
  });

  test("completes the user range check if myLat and myLng are valid 6 digit or longer numbers", () => {
    // Arrange
    let promise = new Promise((resolve, reject) => {
      myLat = 55.946873;
      myLng = -3.191229;
      if (myLat !== "" && myLng !== "" && myLat.toString().length>= 6 && myLng.toString().length>= 6) {
        resolve("OK");
      } else {
        reject("No device coords");
      }
    });
    promise.then(
      function (value) {
        console.log(value);
        userRangeCheck();
      },
      function (error) {
        console.log(error);
      }
    );
    // Act
    // .. nothing

    // Assert
    expect(promise).resolves;
  });

  test("throws when myLat/myLng are empty strings", () => {
    // Arrange
    // get user coordinates
    // When working with throw new Error and Jest: You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
    myLat = "";
    myLng = "";
    function useEmptyStrings() {
      userRangeCheck();
    }

    // Act
    // .. nothing

    // Assert
    expect(useEmptyStrings).toThrowError("Please turn on location tracking");
    expect(useEmptyStrings).toThrowError(
      new Error("Please turn on location tracking")
    );
    expect(useEmptyStrings).toThrowError(Error);
  });

  test("locLng is defined", () => {
    // Arrange
    myLat = "000000";
    myLng = "000000";
    userRangeCheck();

    // Act
    // .. nothing

    // Assert
    expect(locLng).toBeDefined();
    expect(locLng).not.toBeNaN();
    expect(locLng)
      .toString()
      .match(/[0-9]{6}/);
  });

  test("locLat is defined", () => {
    // Arrange
    myLat = "000000";
    myLng = "000000";
    userRangeCheck();

    // Act
    // .. nothing

    // Assert
    expect(locLat).toBeDefined();
    expect(locLat).not.toBeNaN();
    expect(locLat)
      .toString()
      .match(/[0-9]{6}/);
  });

  /* test("userRangeCheck sets collect button text if device coordinates set", () => {
    // Arrange
    userRangeCheck();

    // Act
    // .. nothing

    // Assert
   
    
  }); */
});
