import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterAdmin } from "../../../shared/hooks/useAuth";

export default function AdminRegister() {
  const navigate = useNavigate();

  const registerMutation = useRegisterAdmin();

  const [error, setError] = useState("");
  const [showServerStartingMessage, setShowServerStartingMessage] =
    useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!registerMutation.isPending) return;

    const timeoutId = setTimeout(() => {
      setShowServerStartingMessage(true);
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [registerMutation.isPending]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, email, password } = formData;

    // Frontend validation
    if (!userName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setShowServerStartingMessage(false);

    await registerMutation.mutate(
      {
        userName,
        email,
        password,
      },

      {
        onSuccess: () => {
          console.log("success");
          // OTP verification page
          navigate("/verify-otp", {
            state: { email },
          });
        },

        onError: (error) => {
          console.log(error);
          setError(
            error?.response?.data?.message ||
              "Registration failed. Please try again.",
          );
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12 rounded-full lg:block hidden"
            loading="lazy"
          />

          <h1 className="text-xl font-semibold bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">
            TITTO LIVE
          </h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 opacity-70">
          Admin Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {registerMutation.isPending && showServerStartingMessage && (
          <p className="text-gray-500 text-sm text-center mb-4" role="status">
            The server is starting up. The first request after a while may take
            a little longer on Render's free plan. Please wait.
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>

            <input
              type="text"
              name="userName"
              placeholder="Enter username"
              value={formData.userName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none"
            />
          </div> */}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-secondary text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
          >
            {registerMutation.isPending ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-secondary font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
