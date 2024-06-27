import axios from "axios";
export const http = axios.create({
  baseURL: "http://192.144.238.201:8000/",
  timeout: 10000,
});