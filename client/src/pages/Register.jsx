import React from "react";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
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
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        form
      );

      // Redirect to login page on successful registration
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Join ConnectSphere
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />
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
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
