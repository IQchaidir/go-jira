import { Search } from "lucide-react"
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
            navigate(`/?${params.toString()}`)
        }
    }, [debouncedSearchQuery])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value
        setSearchQuery(query)
    }

    return (
        <div className="flex items-center bg-gray-100 rounded-md">
            <input
                type="search"
                placeholder="Search card..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-1 border-gray-100 border rounded-l-md"
            />
            <div className="px-2">
                <Search className="text-black w-5 h-5" />
            </div>
        </div>
    )
}

export default SearchInput
