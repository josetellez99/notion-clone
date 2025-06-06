import { Routes, Route } from "react-router-dom";
import { DashboardPage } from '@/components/pages/Dasboard/Dashboard'
import { ProtectedRoute } from "@/routes/protectedRoute";
import { AppPage } from "@/components/pages/AppPage/AppPage";
import { SidebarLayout } from "@/components/layout/SidebarLayout/SidebarLayout";
import { SinglePage } from "@/components/pages/Page/SinglePage";

export const AppRouter = () => {
    return (
        <Routes>
            {/* Public Routes */}


            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<SidebarLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/" element={<AppPage />} />
                    <Route path="/page/:id" element={<SinglePage />} />
                </Route>
            </Route>

            {/* 404 Route */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
};