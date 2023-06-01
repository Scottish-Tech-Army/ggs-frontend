const BASE_URL = process.env.REACT_APP_AWS_CLIENT_API_ENDPOINT;

// The onSubmit of a reactbootstrap <Form/> component in the login modal
// calls the following function, which:
// 1) uses fetch() with first arg the url of the login page
// of the app and the second arg an object you'd expect.
// 2) returns 
export function login(email) {

  return fetch(BASE_URL + "unit/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }), // jsonify JS object {email: "xxx.yyy@zzz.com”} and make it the request body
  }).then(response => {
    if (response.ok) {
      console.log(`in auth.js, in login(), and  response.status is ${response.status} and  response.statusText is ${response.statusText}`)
      return response.json(); // the response is like this: {"email":"xxx.yyy@zzz.com","name":"developerOne"}.
      // Method json() is part of the fetch() API. it returns a Promise that resolves as a JS object.
                     }
    throw response;
                    })
}

// email, before it becomes the request body above, is {email: "xxx.yyy@zzz.com”}
// and the response body is 
// {"email":"xxx.yyy@zzz.com","name":"developerOne"}
// assuming you have already registered with the following details
// and are trying to log in:
// email xxx.yyy@zzz.com and 
// name developerOne



// OLD CODE:
export function register(email, name) {
  return fetch(BASE_URL + "unit/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name }), // stringify this object: {email: "test@test, name: "Testy Tester"}
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  })
}

// tues30May23 This is the new function that code in <LoginModal/>
// calls. The change is necessary because the new register screen 
// has a field for county:
export function newRegister(email, name, county) {
  return fetch(BASE_URL + "unit/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, county }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  })
}




