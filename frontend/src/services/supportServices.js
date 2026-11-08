import axiosClient from "../api/axiousClient";

export const getSupportAgencies = async () => {
  const { data } = await axiosClient.get("/support-agency");
  return data.data;
};

export const createSupportAgency = async (payload) => {
  const { data } = await axiosClient.post("/support-agency", payload);
  return data.data;
};

export const updateSupportAgency = async ({ id, payload }) => {
  const { data } = await axiosClient.put(`/support-agency/${id}`, payload);
  return data.data;
};

export const deleteSupportAgency = async (id) => {
  const { data } = await axiosClient.delete(`/support-agency/${id}`);
  return data;
};

export const getSupportAgencyCountries = async () => {
  const { data } = await axiosClient.get("/country");
  return data.data;
};
