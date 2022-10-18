import { api } from "./api/api";

export const fetcher = async (...args: any[]) => {
  // @ts-ignore
  const res = await api.get(...args);
  return res.data;
};
