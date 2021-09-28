const baseURL = "https://localhost:5001/api/";

export function getLocations() {
  return fetch(baseURL + "locations").then((data) => data.json());
}

export function createLocation(location) {
  return fetch(baseURL + "location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location }),
  }).then((data) => data.json());
}
