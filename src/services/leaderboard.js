const baseURL = "https://localhost:5001/api/";

export function getLeaderboard() {
  return fetch(baseURL + "unit/leaderboard")
    .then((data) => data.json())
    .catch((err) => {
      console.error(err);
    });
}

export function createLeaderboardEntry(leaderboardEntry) {
  return fetch(baseURL + "unit/leaderboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ leaderboardEntry }),
  }).then((data) => data.json());
}

export function getLeaderboardAuth(token) {
  return fetch(baseURL + "unit/leaderboard", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((data) => data.json())
    .catch((err) => {
      console.error(err);
    });
}
