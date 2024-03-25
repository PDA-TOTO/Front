import axios from "axios";

export const BASE_URL = process.env.BASE_URL;
export const SHINHAN_BASE_URL = process.env.SHINHAN_BASE_URL;

export const userInstance = axios.create({
  baseURL: BASE_URL + "/users",
});

export const shinhanStockInstance = axios.create({
  baseURL: "/openapi",
});

export const stockInstance = axios.create({
  baseURL: BASE_URL + "/stocks",
});
