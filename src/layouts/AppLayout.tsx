import { Outlet } from "react-router";
import { Header } from "../components/Header";


export function AppLayout() {



    return (
        <div className="w-full h-screen bg-gray-400 flex flex-col items-center text-gray-100">
            <main className="p-3 w-full">
                <Header />
                <Outlet />
            </main>
        </div>
    )
}