import { useState, type JSX } from "react";
import axios, { AxiosError } from "axios";
import { LogoIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        console.log(firstname, lastname, username, email, password)
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      setMessage(res.data.message || "Регистрация успешна!");
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      setMessage(error.response?.data?.message || "Ошибка при регистрации");
    }
  };

  return (
    <div className="registerCard flex column g16">
      <LogoIcon />
      <form onSubmit={handleSubmit} className="flex column g16">
        <p className="titleText">Регистрация</p>
        <div className="fullNameBox flex center g16">
          <div className="floating-input">
            <input 
            className="" 
            type="firstname" 
            id="firstname"
            name="firstname"
            placeholder="Имя" 
            value={firstname} 
            onChange={(e => setFirstname(e.target.value))}  
            required/>
            <label htmlFor="firstname">Имя</label>
          </div>
          <div className="floating-input">
            <input 
            className="" 
            type="lastname" 
            id="lastname"
            name="lastname"
            placeholder="Фамилия" 
            value={lastname} 
            onChange={(e => setLastname(e.target.value))}  
            required/>
            <label htmlFor="lastname">Фамилия</label>
          </div>
        </div>
        <div className="floating-input">
          <input 
          className="" 
          type="username" 
          id="username"
          name="username"
          placeholder="Имя пользователя" 
          value={username} 
          onChange={(e => setUsername(e.target.value))}  
          required/>
          <label htmlFor="username">Имя пользователя</label>
        </div>
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

        <button type="submit" className="registerButton">Создать аккаунт</button>
        <a onClick={() => navigate("/login")} className="loginLink">Уже есть аккаунт? Войти в аккаунт</a>
        {message && (
          <p className="message">{message}</p>
        )}
      </form>
    </div>
  );
};
