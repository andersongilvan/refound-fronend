
import { Route, Routes } from "react-router";
import { Signin } from "../pages/signinPage";
import { AuthLayout } from "../layouts/AuthLayout";
import { Signup } from "../pages/signinupPage";
import { NotFound } from "../pages/NotFound";


export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />} >
                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}