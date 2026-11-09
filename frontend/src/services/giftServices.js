import axiosClient from "../api/axiousClient";

export const getGifts = async () => {
  const { data } = await axiosClient.get("/gifts");
  return data.data;
};

export const getGiftStats = async () => {
  const { data } = await axiosClient.get("/gifts/stats");
  return data.data;
};

export const getGift = async (id) => {
  const { data } = await axiosClient.get(`/gifts/${id}`);
  return data.data;
};

export const createGift = async (payload) => {
  const formData = new FormData();
  formData.append("giftName", payload.giftName);
  formData.append("giftPrice", payload.giftPrice);
  formData.append("category", payload.category);
  formData.append("giftImage", payload.giftImage);

  const { data } = await axiosClient.post("/gifts", formData);
  return data.data;
};

export const updateGift = async ({ id, payload }) => {
  const formData = new FormData();
  formData.append("giftName", payload.giftName);
  formData.append("giftPrice", payload.giftPrice);
  formData.append("category", payload.category);
  if (payload.giftImage) {
    formData.append("giftImage", payload.giftImage);
  }

  const { data } = await axiosClient.put(`/gifts/${id}`, formData);
  return data.data;
};

export const deleteGift = async (id) => {
  const { data } = await axiosClient.delete(`/gifts/${id}`);
  return data;
};
