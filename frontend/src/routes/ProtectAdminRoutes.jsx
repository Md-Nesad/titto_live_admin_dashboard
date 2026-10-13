import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectAdminRoutes() {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
