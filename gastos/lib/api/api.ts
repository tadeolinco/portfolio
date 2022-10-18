import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((request) => {
  if (request.headers) {
    const token = localStorage.getItem("gastos@token");
    // @ts-ignore
    request.headers.common.Authorization = `Bearer ${token}`;
  }
  return request;
});
