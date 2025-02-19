import { Routes, Route } from "react-router-dom";
import { Dashboard } from '@/components/pages/Dashboard'
import { ProtectedRoute } from "@/routes/protectedRoute";

export const AppRouter = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="/page/:id" element={<PageView />} /> */}
            </Route>

            {/* 404 Route */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
};