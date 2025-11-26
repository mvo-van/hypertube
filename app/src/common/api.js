import axios from "axios";

/**
 * Create an axios instance with the api base URL
 */
export const api = axios.create({
  baseURL: "http://localhost:3000/",
});
