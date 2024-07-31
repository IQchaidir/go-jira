import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="bg-white sticky top-0 shadow-md py-2 px-7 z-50 flex justify-between items-center w-full">
            <div className="flex gap-2">
                <Menu className="flex md:hidden" />
                <Link to={"/"}>
                    <img src="/logo.webp" width={180} />
                </Link>
            </div>
            <input type="search" placeholder="Search..." className="p-1 border-black border rounded-md" />
        </nav>
    )
}

export default Navbar
