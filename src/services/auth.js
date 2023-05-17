const BASE_URL = process.env.REACT_APP_AWS_CLIENT_API_ENDPOINT;

export function login(email) {
  return fetch(BASE_URL + "unit/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }), // jsonify JS object {email: "xxx.yyy@zzz.com”} and make it the request body
  }).then(response => {
    if (response.ok) {
      return response.json(); // unjson the response (which is  {"email":"xxx.yyy@zzz.com","name":"developerOne"} )
    }
    throw response;
  })
}

// email (the request body above) is {"email":"xxx.yyy@zzz.com”}
// and the response body is 
// {"email":"xxx.yyy@zzz.com","name":"developerOne"}
// assuming you have already registered with the following details
// and are trying to log in:
// email xxx.yyy@zzz.com and 
// name developerOne




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

// When you try to register with the following personal info:
// {"email":"xxx@yyy.com","name":"MrDeveloper"}
// The response body is:
// {"email":"xxx@yyy.com","name":"MrDeveloper"}
// (ie the same)



