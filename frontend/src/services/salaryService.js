import axiosClient from "../api/axiousClient";

export const getSalaries = async () => {
  const { data } = await axiosClient.get("/salaries");
  return data.data;
};

export const createSalary = async (payload) => {
  const { data } = await axiosClient.post("/salaries", payload);
  return data.data;
};

export const updateSalary = async ({ id, payload }) => {
  const { data } = await axiosClient.put(`/salaries/${id}`, payload);
  return data.data;
};

export const deleteSalary = async (id) => {
  const { data } = await axiosClient.delete(`/salaries/${id}`);
  return data;
};
