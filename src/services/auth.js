const BASE_URL = process.env.REACT_APP_AWS_CLIENT_API_ENDPOINT;

export function login(email) {
  return fetch(BASE_URL + "unit/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  })
}

export function register(email, name) {
  return fetch(BASE_URL + "unit/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  })
}
