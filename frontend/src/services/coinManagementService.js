import axiosClient from "../api/axiousClient";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getExchangeRate = async () => {
  const { data } = await axiosClient.get("/coins/exchange-rate");
  return data.data;
};

export const updateExchangeRate = async (payload) => {
  const { data } = await axiosClient.post("/coins/exchange-rate", payload);
  return data;
};

export const sellCoinsToAgency = async (payload) => {
  const { data } = await axiosClient.post(
    "/coins/sell",
    payload,
    getAuthConfig(),
  );
  return data.data;
};
