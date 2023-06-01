const BASE_URL = process.env.REACT_APP_AWS_CLIENT_API_ENDPOINT;


// NOTE: in the original code the following function 
// was called getLeaderboard, hence the use of 
// "unit/leaderboard" in the first arg of fetch()
// below.
export function getCompletedChallenges(email) {
  return fetch(BASE_URL + "unit/leaderboard", {
    method: "GET",
    headers: {
      GGSUnit: email,
    },
  })
    .then((data) => data.json()) // the .json() returns the actual data
    .catch((err) => {
      console.error(err);
    });
}
