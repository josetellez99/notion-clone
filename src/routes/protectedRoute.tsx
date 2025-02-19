import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const isAuthenticated = Boolean(localStorage.getItem("token")); // Replace with real auth logic

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};