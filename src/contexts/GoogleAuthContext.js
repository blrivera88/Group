// src/contexts/GoogleAuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleAuthContext = createContext();

const GoogleAuthProviderComponent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("User is already logged in:", JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("User successfully logged in:", userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("User logged out");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleAuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
      </GoogleAuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProviderComponent;
