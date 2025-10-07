import { useEffect, useState, type JSX } from "react";
import { MenuIcon, MusicIcon, NotificationIcon, SearchIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css"
import DropDownMenu from "./DropDownMenu";
import { useAuthValue } from "../hooks/useAuth";
import { UserCard } from "./UserCard";



export default function Header(): JSX.Element {
  const { isAuth, setIsAuth } = useAuthValue();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setIsAuth(true);
  }, []);

  return (
    <header className="flex between">
      {isAuth ? (
        <>
          <div className="leftBox flex g16 center">
            <p className="logo" onClick={()=> navigate("/feed")}>NAME</p>
            <nav className="flex center g16">
              <div className="searcInput">
                <SearchIcon />
                <input type="search" name="search" id="search" />
              </div>
              <button className="notifcationButton"><NotificationIcon /></button>
              <button className="musicButton"><MusicIcon /></button>
            </nav>
          </div>

          <div className="userBox flex center g8">
            <UserCard />
            <button
                className={`dropDownMenuButton ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(prev => !prev)}
            >
                <MenuIcon />
            </button>
            {menuOpen && <DropDownMenu onClose={() => setMenuOpen(false)} />}
          </div>
        </>
      ) : (
        <>
            <p className="logo" onClick={()=> navigate("/feed")}>NAME</p>
            <div className="authBox flex center g8">
                <button className="loginButton" onClick={() => navigate("/login")}>
                    Войти
                </button>
                <button
                    className="registerButton"
                    onClick={() => navigate("/register")}
                >
                    Регистрация
                </button>
            </div>
        </>
        
      )}
    </header>
  );
}
