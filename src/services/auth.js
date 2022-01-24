const baseURL = "https://localhost:5001/api/";

export function login(code) {
  return fetch(baseURL + "unit/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  }).then(response =>{
    if (response.ok)
    {
        return response.json();
    }
    throw response;
  })
}
