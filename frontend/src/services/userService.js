import axiosClient from "../api/axiousClient";

export const getUsers = async () => {
  const { data } = await axiosClient.get("/users");
  return data.data;
};

export const getUserStats = async () => {
  const { data } = await axiosClient.get("/users/stats");
  return data.data;
};

export const getUser = async (id) => {
  const { data } = await axiosClient.get(`/users/${id}`);
  return data.data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosClient.delete(`/users/${id}`);
  return data;
};
