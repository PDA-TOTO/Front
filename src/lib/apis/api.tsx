import axios from "axios";

export const BASE_URL = process.env.BASE_URL;
export const SHINHAN_BASE_URL = process.env.SHINHAN_BASE_URL;

export const userInstance = axios.create({
  baseURL: BASE_URL + "/users",
  withCredentials: true,
});

export const shinhanStockInstance = axios.create({
  baseURL: "/openapi",
  withCredentials: true,
});

export const portfolioInstance = axios.create({
<<<<<<< HEAD
    baseURL: BASE_URL + "/portfolios",
    withCredentials: true
=======
  baseURL: BASE_URL + "/portfolio",
  withCredentials: true,
});

export const portfolioInstance2 = axios.create({
  baseURL: BASE_URL + "/portfolios",
  withCredentials: true,
>>>>>>> 2302ab355ef6a9f32d7fe3890b611fba30b6fb96
});

export const stockInstance = axios.create({
  baseURL: BASE_URL + "/stocks",
  withCredentials: true,
});

export const communityInstance = axios.create({
  baseURL: BASE_URL + "/community",
  withCredentials: true,
});

export const commentInstance = axios.create({
  baseURL: BASE_URL + "/comment",
  withCredentials: true,
});

export const quizInstance = axios.create({
  baseURL: BASE_URL + "/quiz",
  withCredentials: true,
});
