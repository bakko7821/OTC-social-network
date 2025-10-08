import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface DropDownMenuProps {
  onClose: () => void;
}

export default function DropDownMusicnMenu({ onClose } : DropDownMenuProps) {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="dropDownMusicMenu">
            <p className="nullMessage">Не можем загрузить вашу музыку</p>
        </div>
    )
}