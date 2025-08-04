import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ Loading state added

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("Loaded user from localStorage:", parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false); // ⬅️ Mark loading complete after check
  }, []);

  // Call this after successful login
  const login = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("User logged in:", userData);
    } else {
      console.warn("Attempted login with empty user data");
    }
  };

  // Clear user from state and storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);
