import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    // const isAuthenticated = Boolean(localStorage.getItem("token")); // Replace with real auth logic
    const validate = true
    return validate ? <Outlet /> : <Navigate to="/login" />;
};