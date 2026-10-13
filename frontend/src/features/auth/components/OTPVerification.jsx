import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyAdminOtp } from "../../../shared/hooks/useAuth";

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Location from OTP:", location); // Debugging line to check the location value

  const verifyMutation = useVerifyAdminOtp();

  const email = location.state?.email;

  console.log("Email from state:", email); // Debugging line to check the email value

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is missing. Please register again.");
      return;
    }

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    setError("");

    console.log("OTP from OTP:", otp); // Debugging line to check the otp value
    console.log("Email from OTP:", email); // Debugging line to check the email value

    verifyMutation.mutate(
      {
        email,
        otp,
      },
      {
        onSuccess: () => {
          navigate("/login", {
            replace: true,
          });
        },

        onError: (error) => {
          setError(
            error?.response?.data?.message || "OTP verification failed.",
          );
        },
      },
    );

    console.log("OTP from OTP after send:", otp); // Debugging line to check the otp value
    console.log("Email from OTP after send:", email); // Debugging line to check the email value
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Verify Your Email
        </h1>

        <p className="text-sm text-gray-900 text-center mb-6">
          Enter the OTP sent to
          <br />
          <span className="font-medium text-gray-700">
            {email || "your email"}
          </span>
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">OTP</label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ""));
                setError("");
              }}
              className="w-full border rounded-lg px-4 py-2 text-center tracking-[0.5em] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={verifyMutation.isPending}
            className="w-full bg-secondary text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full mt-4 text-sm text-gray-500 hover:underline"
        >
          Back to Register
        </button>
      </div>
    </div>
  );
}
