import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "../../../services/authServices";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showServerStartingMessage, setShowServerStartingMessage] =
    useState(false);

  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      console.log("data from login", data);
      localStorage.setItem("adminToken", data.token);
      navigate("/dashboard");
    },
  });

  useEffect(() => {
    if (!loading) return;

    const timeoutId = setTimeout(() => {
      setShowServerStartingMessage(true);
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowServerStartingMessage(false);

    mutate({
      email: formData.username,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center gap-6 mb-6 group">
          {/* Logo */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-secondary/20 blur-md group-hover:bg-secondary/30 transition-all" />

            <img
              src="/logo.png"
              alt="Titto Live Logo"
              className="relative w-11 h-11 rounded-full object-cover ring-2 ring-secondary/40 p-0.5 transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Brand Name */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-[0.12em] leading-none bg-linear-to-r from-secondary via-[#ff6b6b] to-[#ffb199] bg-clip-text text-transparent">
              TITTO <span className="text-white">LIVE</span>
            </h1>

            <span className="text-[9px] font-medium tracking-[0.35em] text-gray-400 mt-1">
              CONNECT • SHARE • LIVE
            </span>
          </div>
        </div>

        <div className="text-center mb-7">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">
            Welcome <span className="text-secondary">Back!</span>
          </h2>
          <p className="text-sm text-gray-400 mt-2 tracking-wide">
            Sign in to your admin dashboard
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error.response?.data?.message || error.message}
          </p>
        )}

        {loading && showServerStartingMessage && (
          <p className="text-gray-500 text-sm mb-4 text-center" role="status">
            The server is starting up. The first request after a while may take
            a little longer on Render's free plan. Please wait.
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter admin username"
              value={formData.username}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-secondary font-medium hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
