import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDebounce } from "use-debounce"

const SearchInput = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const initialQuery = params.get("search") || ""

    const [searchQuery, setSearchQuery] = useState<string>(initialQuery)
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        if (params.get("search") !== debouncedSearchQuery) {
            if (debouncedSearchQuery) {
                params.set("search", debouncedSearchQuery)
            } else {
                params.delete("search")
            }
            navigate(`/?${params.toString()}`, { replace: true })
        }
    }, [debouncedSearchQuery])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase()
        setSearchQuery(query)
    }

    return (
        <input
            type="search"
            placeholder="Search card..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-1 border-black border rounded-md"
        />
    )
}

export default SearchInput
