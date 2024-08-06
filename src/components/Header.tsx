import { Menu } from "lucide-react"
import { Link } from "react-router-dom"
import SearchInput from "./SearchInput"

const Navbar = () => {
    return (
        <header className="bg-white sticky top-0 shadow-md py-2 px-7 z-50 flex justify-between items-center w-full">
            <div className="flex gap-2">
                <Menu className="flex md:hidden" />
                <Link to={"/"}>
                    <img src="/logo.webp" width={180} />
                </Link>
            </div>
            <SearchInput />
        </header>
    )
}

export default Navbar
