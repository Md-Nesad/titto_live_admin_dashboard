import axiosClient from "../api/axiousClient";

export const getAgencies = async () => {
  const { data } = await axiosClient.get("/agency");
  return data.data;
};

export const getAgency = async (agencyId) => {
  const { data } = await axiosClient.get(`/agency/${agencyId}`);
  return data.data;
};

export const getAgencyCountries = async () => {
  const { data } = await axiosClient.get("/country");
  return data.data;
};

export const createAgency = async (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  const { data } = await axiosClient.post("/agency", formData);
  return data.data;
};

export const updateAgency = async ({ agencyId, payload }) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  const { data } = await axiosClient.put(`/agency/${agencyId}`, formData);
  return data.data;
};

export const deleteAgency = async (agencyId) => {
  const { data } = await axiosClient.delete(`/agency/${agencyId}`);
  return data;
};
