import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            StreamDoing
          </h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 opacity-70">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form className="space-y-4">
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
            onClick={() => navigate("/dashboard")}
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
