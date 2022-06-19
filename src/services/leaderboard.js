const BASE_URL = process.env.REACT_APP_AWS_CLIENT_API_ENDPOINT;

export function getLeaderboard(unitName) {
  return fetch(BASE_URL + "unit/leaderboard", {
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
