import { useMutation } from "@tanstack/react-query";
import { registerAdmin, verifyAdminOtp } from "../../services/authServices";

export const useRegisterAdmin = () => {
  return useMutation({
    mutationFn: registerAdmin,
  });
};

export const useVerifyAdminOtp = () => {
  return useMutation({
    mutationFn: verifyAdminOtp,
  });
};
