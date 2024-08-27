// src/Components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GoogleAuthContext } from "../contexts/GoogleAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(GoogleAuthContext);

  if (loading) {
    // You can display a loading spinner or message here
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
