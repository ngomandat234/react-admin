import axios from "axios";
import queryString from "query-string";
// import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:5000/",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

instance.interceptors.request.use(
  (config) => {
    // let token;
    // if (typeof window !== "undefined") {
    //   token = Cookies.get("accessToken");
    // }
    // if (token) {
    //   // Add token to header request
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (err) => err,
);

// Refresh token handle

// Handle Response Data
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;
