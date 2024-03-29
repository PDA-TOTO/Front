import axios from "axios";

export const BASE_URL = process.env.BASE_URL;
export const SHINHAN_BASE_URL = process.env.SHINHAN_BASE_URL;

export const userInstance = axios.create({
  baseURL: BASE_URL + "/users",
  withCredentials: true,
});

export const shinhanStockInstance = axios.create({
  baseURL: "/openapi",
});

export const stockInstance = axios.create({
  baseURL: BASE_URL + "/stocks",
});

export const communityInstance = axios.create({
  baseURL: BASE_URL + "/community",
  withCredentials: true,
});

export const commentInstance = axios.create({
  baseURL: BASE_URL + "/comment",
  withCredentials: true,
});
