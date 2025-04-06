import React from "react";
import { Navigate } from "react-router-dom";

// ✅ Ensure Protected Routes Require Authentication and Correct Role
const ProtectedRoute = ({ component: Component, role }) => {
  const userID = localStorage.getItem("userID");
  const userRole = localStorage.getItem("role");

  // ✅ If no userID, redirect to login
  if (!userID) return <Navigate to="/login" />;

  // ✅ If role-based restriction exists and user doesn't match, redirect
  if (role && userRole !== role) {
    return <Navigate to="/session" />;
  }

  return <Component />;
};

export default ProtectedRoute;
