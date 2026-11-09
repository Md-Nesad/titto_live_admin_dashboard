import axiosClient from "../api/axiousClient";

export const getMonthlyRevenue = async () => {
  const { data } = await axiosClient.get("/transactions/revenue");
  return data.data;
};
