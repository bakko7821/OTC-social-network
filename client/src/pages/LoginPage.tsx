import { useState, type JSX } from "react";
import axios, { AxiosError } from "axios";
import "../styles/auth_page.scss"
import { useNavigate } from "react-router-dom";

interface ApiError {
  message?: string;
}

export default function LoginPage() : JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      
      const {token, user} = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id.toString());

      setMessage(res.data.message || "Успешный вход!");
      window.location.href = "/feed"
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      setMessage(error.response?.data?.message || "Ошибка при авторизации");
    }
  };

  return (
    <div className="loginCard flex column g16">
      <form onSubmit={handleSubmit} className="flex column g16">
        <p className="titleText">Войти в аккаунт</p>
        <div className="floating-input">
          <input 
          className="" 
          type="email" 
          id="email"
          name="email"
          placeholder="Электронная почта" 
          value={email} 
          onChange={(e => setEmail(e.target.value))}  
          required/>
          <label htmlFor="email">Электронная почта</label>
        </div>
        <div className="floating-input">
          <input 
          className="" 
          type="password"
          id="password"
          name="password"
          placeholder="Пароль" 
          value={password} 
          onChange={(e => setPassword(e.target.value))}  />
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
