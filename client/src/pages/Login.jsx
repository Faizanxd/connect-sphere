import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import your AuthContext

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login method
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        form
      );

      const { token, ...user } = res.data;

      localStorage.setItem("token", token);
      login(user); // set user in context
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Welcome Back to ConnectSphere
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="submit"
          className="bg-primary text-white w-full py-3 bg-blue-600 rounded-full font-semibold hover:bg-gray-600 hover:text-white transition duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-center text-sm text-muted">
          Don’t have an account?{" "}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
