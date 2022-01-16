const baseURL = "https://localhost:5001/api/";

export function getLocations() {
  return fetch(baseURL + "locations")
  .then((data) => data.json())
  .catch(err => {
    console.log(err)
  });
}

export function createLocation(location) {
  return fetch(baseURL + "locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location }),
  }).then((data) => data.json());
}

export function getLocationsAuth(token) {
  return fetch(baseURL + "locations", {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((data) => data.json())
  .catch(err => {
    console.log(err)
  });
}