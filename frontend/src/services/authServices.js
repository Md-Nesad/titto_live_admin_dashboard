import axiousClient from "../api/axiousClient.js";

export const registerAdmin = async ({ userName, email, password }) => {
  const response = await axiousClient.post("/auth/register", {
    userName,
    email,
    password,
  });

  console.log("response from auth service", response);

  return response.data;
};

export const verifyAdminOtp = async ({ email, otp }) => {
  const response = await axiousClient.post("/auth/verify-otp", {
    email,
    otp,
  });

  return response.data;
};

export const loginAdmin = async ({ email, password }) => {
  const response = await axiousClient.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
