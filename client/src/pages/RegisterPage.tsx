import { useState, type JSX } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/auth_page.scss'

interface ApiError {
  message?: string;
}

export default function RegisterPage() : JSX.Element {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        firstname,
        lastname,
        username,
        email,
        password,
      });

      setMessage(res.data.message || "Регистрация успешна!");

      const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      const { token, user } = loginRes.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id.toString());

      setMessage(loginRes.data.message || "Успешный вход!");
      window.location.href = "/";

    } catch (err) {
      const error = err as AxiosError<ApiError>;
      setMessage(error.response?.data?.message || "Ошибка при регистрации/авторизации");
    }
  };

  return (
    <div className="page flex center">
      <form onSubmit={handleRegister} className="flex center column g16">
        <p className="titleText">Регистрация</p>
        <div className="fullNameBox flex center g16">
          <div className="floating-input firstname">
              <input 
                  type="text" 
                  placeholder=" " 
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}/>
              <label htmlFor="firstname">Имя</label>
          </div>
          <div className="floating-input lastname">
              <input 
                  type="text" 
                  placeholder=" " 
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}/>
              <label htmlFor="lastname">Фамилия</label>
          </div>
        </div>
        <div className="floating-input username">
              <input 
                  type="text" 
                  placeholder=" " 
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
              <label htmlFor="username">@ Имя пользователя</label>
          </div>
        <div className="floating-input email">
              <input 
                  type="text" 
                  placeholder=" " 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
              <label htmlFor="email">Почта</label>
          </div>
        <div className="floating-input password">
              <input 
                  type="password" 
                  placeholder=" " 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              <label htmlFor="password">Пароль</label>
          </div>

        <button type="submit" className="registerButton">Создать аккаунт</button>
        <a onClick={() => navigate("/login")} className="loginLink">Уже есть аккаунт? Войти в аккаунт</a>
        {message && (
          <p className="message">{message}</p>
        )}
      </form>
    </div>
  );
};
