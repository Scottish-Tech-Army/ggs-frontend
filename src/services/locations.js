const BASE_URL = process.env.REACT_APP_AWS_CLIENT_API_ENDPOINT;

export function getLocations(unitName) {
  return fetch(BASE_URL + "locations", {
    method: "GET",
    headers: {
      GGSUnit: unitName,
    },
  })
    .then((data) => data.json())
    .catch((err) => {
      console.error(err);
    });
}

export function collectLocation(unitName, id) {
  return fetch(BASE_URL + "unit/collect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      GGSUnit: unitName,
    },
    body: JSON.stringify({ id })
  }).catch((err) => {
    console.error(err);
  });
}
