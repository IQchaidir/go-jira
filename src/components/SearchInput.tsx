import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const query = params.get("search") || ""
        setSearchQuery(query)
    }, [])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase()
        setSearchQuery(query)
        const params = new URLSearchParams(location.search)
        if (query) {
            params.set("search", query)
        } else {
            params.delete("search")
        }
        navigate(`?${params.toString()}`)
    }

    return (
        <input
            type="search"
            placeholder="Search card..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-1 border-black border-2 rounded-md"
        />
    )
}

export default SearchInput
