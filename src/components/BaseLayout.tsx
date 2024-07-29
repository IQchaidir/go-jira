import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const BaseLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <main className="flex h-full">
                <Sidebar />
                <Outlet />
            </main>
        </div>
    )
}

export default BaseLayout
