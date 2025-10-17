import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChangeThemeIcon, InfoIcon, LogOutIcon, SettingsIcon } from "../Icons/Icons";
import { useThemeToggle } from "../hooks/useThemeToggle";

interface DropDownMenuProps {
  onClose: () => void;
}

export default function DropDownMenu({ onClose } : DropDownMenuProps) {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate()
    
    const { isDark, toggleTheme } = useThemeToggle();

    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/feed");
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
        <div className="dropDownMenu flex column g8">
            <button className="changeThemeButton flex g8" onClick={toggleTheme}><ChangeThemeIcon/> Сменить тему</button>
            <button className="settingsButton flex g8"><SettingsIcon /> Настройки</button>
            <button className="helpButton flex g8"><InfoIcon /> Помощь</button>
            <button onClick={handleLogout} className="logOutButton flex g8"><LogOutIcon /> Выйти</button>
        </div>
    )
}