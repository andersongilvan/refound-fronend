import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/AppLayout";
import { DashBoard } from "../pages/DashboardManager";
import { NotFound } from "../pages/NotFound";
import { RefoundPage } from "../pages/RefoundPage";

export function ManagerRoutes() {
    return <Routes>
        < Route path="/" element={<AppLayout />} >
            <Route path="/" element={<DashBoard />} />
            <Route path="/refound/:id" element={<RefoundPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>

}