import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role }) => {
  const userID = localStorage.getItem("userID");
  const userRole = localStorage.getItem("role");

  if (!userID) {
    return <Navigate to="/login" />; // Redirect if not logged in
  }

  if (role && userRole !== role) {
    return <Navigate to="/session" />; // Prevent non-admins from accessing admin routes
  }

  return <Component />;
};

export default ProtectedRoute;
