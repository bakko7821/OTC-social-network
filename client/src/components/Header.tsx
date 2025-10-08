import { useEffect, useState, type JSX } from "react";
import { LogoIcon, MenuIcon, MusicIcon, NotificationIcon} from "../Icons/Icons";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css"
import DropDownMenu from "./DropDownMenu";
import { useAuthValue } from "../hooks/useAuth";
import { UserCard } from "./UserCard";
import { SearchInput } from "./SearchInput";
import DropDownNotificationMenu from "./DropDownNotificationMenu";
import DropDownMusicnMenu from "./DropDownMusicnMenu";



export default function Header(): JSX.Element {
  const { isAuth, setIsAuth } = useAuthValue();
  const [menuOpen, setMenuOpen] = useState(false);
  const [NotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [MusicMenuOpen, setMusicMenuOpen] = useState(false);
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
            <a onClick={() => navigate("/feed")} className="logo">
              <LogoIcon />
            </a>
            <nav className="flex center g8">
              <SearchInput />
              <div className="buttonsBox flex center g8">
                <button className="notifcationButton" onClick={() => setNotificationMenuOpen(prev => !prev)}><NotificationIcon /></button>
                <button className="musicButton" onClick={() => setMusicMenuOpen(prev => !prev)}><MusicIcon /></button>
                {NotificationMenuOpen && <DropDownNotificationMenu onClose={() => setMenuOpen(false)} />}
                {MusicMenuOpen && <DropDownMusicnMenu onClose={() => setMenuOpen(false)} />}
              </div>
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
            <a onClick={() => navigate("/feed")} className="logo">
              <LogoIcon />
            </a>
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
