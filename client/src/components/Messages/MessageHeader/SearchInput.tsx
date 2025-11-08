import { CrossIcon, SearchIcon } from "../../../assets/Icons"
import type { DropDownMenuProps } from "../../../types"

export const SearchInput = ({ onClose }: DropDownMenuProps) => {
    return (
        <div className="searchInput flex g4">
            <input type="text" />
            <button><SearchIcon /></button>
            <button className="closeButton" onClick={onClose}>
                <CrossIcon />
            </button>
        </div>
    )
}