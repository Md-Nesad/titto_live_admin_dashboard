import axiosClient from "../api/axiousClient";

export const getSettings = async () => {
  const { data } = await axiosClient.get("/settings");
  return data;
};

export const updateSettings = async (payload) => {
  const { data } = await axiosClient.post("/settings", payload);
  return data;
};
