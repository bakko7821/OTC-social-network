import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface DropDownMenuProps {
  onClose: () => void;
}

export default function DropDownMenu({ onClose } : DropDownMenuProps) {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate()

    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
        window.location.reload();
    };

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
        <div className="dropDownMenu">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    )
}