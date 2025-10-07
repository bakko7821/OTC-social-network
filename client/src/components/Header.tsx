import { useEffect, useState, type JSX } from "react";
import { MusicIcon, NotificationIcon, SearchIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Header.css"

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  createdAt: string;
}

export default function Header(): JSX.Element {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Если токен есть — значит пользователь потенциально авторизован
    setIsAuth(true);

    // Загружаем данные пользователя через защищённый маршрут
    axios
      .get<User>("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Ошибка при получении пользователя:", err);

        localStorage.removeItem("token");
        setIsAuth(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <header className="flex between">
      {isAuth ? (
        <>
          <div className="leftBox flex g16 center">
            <p className="logo">NAME</p>
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
            <div className="userAvatar"></div>
            <div className="textBox">
              <p className="fullNameUser">
                {user?.firstname} {user?.lastname}
              </p>
              <p className="userName">@{user?.username}</p>
            </div>
            <button onClick={handleLogout} className="ml-4 text-sm text-gray-500 hover:text-red-500">
              Выйти
            </button>
          </div>
        </>
      ) : (
        <div className="authBox flex g8">
          <button className="loginButton" onClick={() => navigate("/login")}>
            Войти
          </button>
          <button
            className="registrationButton"
            onClick={() => navigate("/register")}
          >
            Регистрация
          </button>
        </div>
      )}
    </header>
  );
}
