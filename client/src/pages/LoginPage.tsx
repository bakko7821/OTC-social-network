import { useState, type JSX } from "react";
import axios, { AxiosError } from "axios";
import "../styles/auth_page.scss"
import { useNavigate } from "react-router-dom";

interface ApiError {
  message?: string;
}

export default function LoginPage() : JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      
      const {token, user} = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id.toString());

      setMessage(res.data.message || "Успешный вход!");
      window.location.href = "/"
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      setMessage(error.response?.data?.message || "Ошибка при авторизации");
    }

  };

  return (
    <div className="page flex center">
        <form onSubmit={handleLogin} className="flex center column g16">
          <p className="titleText">Войти в аккаунт</p>
          <div className="floating-input username">
              <input 
                  type="text" 
                  placeholder=" " 
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
              <label htmlFor="username">@ Имя пользователя</label>
          </div>
          <div className="floating-input username">
              <input 
                  type="password" 
                  placeholder=" " 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              <label htmlFor="password">Пароль</label>
          </div>
          
          <button type="submit" className="authButton">Войти</button>
          <button onClick={() => navigate("/register")} className="registerButton">Создать аккаунт</button>

          {message && (
            <p className="message">{message}</p>
          )}
        </form>
    </div>
  );
};
