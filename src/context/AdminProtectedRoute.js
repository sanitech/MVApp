import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const AdminProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role.toLowerCase() === "admin") {
    return children;
  } else {
    // You can add a different route or component for non-admin users
    return <Navigate to="/unauthorized" replace />;
  }
};

export default AdminProtectedRoute;
