import axios from "axios";
import { clearLocalStorage, getItemFromLocalStorage } from "./localStorage";

export const api = axios.create({
  baseURL: "https://api-license.itdesktop.net/api/",
  headers: {
    "Content-type": "application/json",
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    let token = getItemFromLocalStorage("token");
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// // Response interceptor for API calls
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       // originalRequest._retry = true;
//       // const access_token = await refreshAccessToken();
//       // axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//       // return api(originalRequest);
//       clearLocalStorage();
//     }
//     return Promise.reject(error);
//   }
// );
