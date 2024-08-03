import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

const BaseLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex h-full">
                <Sidebar />
                <Outlet />
            </main>
        </div>
    )
}

export default BaseLayout
