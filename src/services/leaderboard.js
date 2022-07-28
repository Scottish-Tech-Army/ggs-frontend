const BASE_URL = process.env.REACT_APP_AWS_CLIENT_API_ENDPOINT;

export function getLeaderboard(email) {
  return fetch(BASE_URL + "unit/leaderboard", {
    method: "GET",
    headers: {
      GGSUnit: email,
    },
  })
    .then((data) => data.json())
    .catch((err) => {
      console.error(err);
    });
}
