import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/auth/Login";
import AdminDashboardLayout from "../layout/AdminDashboardLayou";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/auth/Register";
import UsersList from "../pages/Users";
import Agencies from "../pages/Agencies";
import CoinManagement from "../pages/CoinManagement";
import TransactionHistory from "../pages/TransactionHistory";
import Finance from "../pages/Finance";
import SalaryTarget from "../pages/SalaryTarget";
import GiftAndAssests from "../pages/GiftAndAssests";
import NotificationCenter from "../pages/NotificationCenter";
import SupportAgency from "../pages/SupportAgency";
import DeleteBan from "../pages/DeleteBan";
import Settings from "../pages/Settings";

export default function AdminDashboardRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          {/* dashboard nested routes here */}
          <Route path="/dashboard" element={<AdminDashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersList />} />
            <Route path="agencies" element={<Agencies />} />
            <Route path="coin-management" element={<CoinManagement />} />
            <Route
              path="transaction-history"
              element={<TransactionHistory />}
            />
            <Route path="finance" element={<Finance />} />
            <Route path="salary-target" element={<SalaryTarget />} />
            <Route path="gifts-assets" element={<GiftAndAssests />} />
            {/* <Route
              path="notification-center"
              element={<NotificationCenter />}
            /> */}
            <Route path="support-agency" element={<SupportAgency />} />
            <Route path="delete-ban" element={<DeleteBan />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
