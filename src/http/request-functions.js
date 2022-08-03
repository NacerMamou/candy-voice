import axios from "axios";

export async function getSimpleToken(email, password, withCSRF) {
  const authEndpoint = `/auth/password`;
  return new Promise((resolve, reject) => {
    axios
      .post(
        authEndpoint,
        {
          email: email,
          password: password,
          cookie: withCSRF,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getUserInformations(xrfToken) {
  const userEndpoint = `/users/me`;
  return new Promise((resolve, reject) => {
    fetch(userEndpoint, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        withCredentials: "true",
        "Access-Control-Allow-Headers": "x-xsrf-token",
        "X-XSRF-TOKEN": xrfToken,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getAllVoices(xrfToken) {
  const userEndpoint = `/voices`;
  return new Promise((resolve, reject) => {
    fetch(userEndpoint, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        withCredentials: "true",
        "Access-Control-Allow-Headers": "x-xsrf-token",
        "X-XSRF-TOKEN": xrfToken,
      },
    })
      .then((res) => {
        res.json().then((data) => resolve(data));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

