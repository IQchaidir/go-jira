import { Menu } from "lucide-react"

const Navbar = () => {
    return (
        <nav className="bg-white sticky top-0 shadow-md p-2 z-50 flex justify-between items-center w-full">
            <div className="flex gap-2">
                <Menu className="flex md:hidden" />
                <div>LOGO</div>
            </div>
            <input type="search" placeholder="Search..." className="p-1 border-black border rounded-md" />
        </nav>
    )
}

export default Navbar
