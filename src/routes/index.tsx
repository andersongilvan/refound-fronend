import { BrowserRouter } from "react-router";
import { ManagerRoutes } from "./ManagerRoutes";
import { Loading } from "../components/Loaading";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { AuthRoutes } from "./auth-routes";
import { useAuth } from "../hooks/useAuth";


export function Routes() {


    const { session, isLoading } = useAuth()


    function Route() {
        switch (session?.user.role) {
            case 'employee':
                return <EmployeeRoutes />

            case 'manager':
                return <ManagerRoutes />

            default:
                return <AuthRoutes />

        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    )
}