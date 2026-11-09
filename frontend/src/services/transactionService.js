import axiosClient from "../api/axiousClient";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getRateTransactions = async () => {
  const { data } = await axiosClient.get(
    "/transactions/rate",
    getAuthConfig(),
  );
  return data.data;
};

export const getTransactionHistory = async () => {
  const { data } = await axiosClient.get(
    "/transactions/history",
    getAuthConfig(),
  );
  return data.data;
};
