import { getToken } from './users-service'
// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc. 
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  const token = getToken()
  if (token) {
    options.headers ||= {}
    // Send our token in the Authorization header
    // common practice to preface our header with 'Bearer'
    options.headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData)
}

export function login(credentials) {
  return sendRequest(BASE_URL + '/login', 'POST', credentials)
}

export function checkToken() {
  return sendRequest(BASE_URL + '/check-token')
}

// export async function login(credentials) {
//   // Fetch uses an options object as a second arg to make requests
//   // other than basic GET requests, include data, headers, etc. 
//   const res = await fetch(BASE_URL + '/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     // Fetch requires data payloads to be stringified
//     // and assigned to a body property on the options object
//     body: JSON.stringify(credentials)
//   });
//   // Check if request was successful
//   if (res.ok) {
//     // res.json() will resolve to the JWT
//     return res.json();
//   } else {
//     throw new Error('Invalid Login');
//   } 
// }