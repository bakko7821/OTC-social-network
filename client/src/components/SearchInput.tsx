import { SearchIcon } from "../Icons/Icons"

export const SearchInput = () => {
    return (
        <div className="searchInput flex g8">
            <SearchIcon />
            <input type="text" />
        </div>
    )
}