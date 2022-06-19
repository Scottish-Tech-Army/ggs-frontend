const BASE_URL = process.env.REACT_APP_AWS_CLIENT_API_ENDPOINT;

export function login(code) {
  return fetch(BASE_URL + "unit/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  })
}
