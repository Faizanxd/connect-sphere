import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // ⬅️ Prevent redirect until auth is loaded

  return user ? children : <Navigate to="/login" />;
}
