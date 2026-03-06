import { Route, Routes } from "react-router";
import { RefoundPage } from "../pages/RefoundPage";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../layouts/AppLayout";
import { Confirm } from "../pages/Confirm";
import { EmployeeDshboard } from "../pages/EmplyeeDashboard";



export function EmployeeRoutes() {
    return (<Routes>
        <Route path="/" element={<AppLayout />}>
            <Route path="/refound" element={<RefoundPage />} />
            <Route path="/" element={ <EmployeeDshboard /> } />
            <Route path="/confirm" element={<Confirm />} />
        </Route>


        <Route path="*" element={<NotFound />} />
    </Routes>)
}