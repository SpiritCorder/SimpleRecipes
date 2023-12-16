import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// public instance of axios
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// private instance of axios
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
