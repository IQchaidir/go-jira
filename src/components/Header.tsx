import { Link } from "react-router-dom"
import SearchInput from "./SearchInput"
import SheetMenu from "./SheetMenu"

const Header = () => {
    return (
        <header className="bg-white sticky top-0 shadow-md py-2  px-3 md:px-7 z-50 flex justify-between items-center w-full">
            <div className="flex gap-2">
                <SheetMenu />
                <Link to={"/"}>
                    <img src="/logo.webp" width={180} />
                </Link>
            </div>
            <SearchInput />
        </header>
    )
}

export default Header
