import { useState, type JSX } from "react";
import axios, { AxiosError } from "axios";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>

        <input
          type="text"
          placeholder="Имя пользователя"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="border rounded w-full p-2 mb-3"
          required
        />
        <input
          type="text"
          placeholder="Имя пользователя"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="border rounded w-full p-2 mb-3"
          required
        />
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded w-full p-2 mb-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full p-2 mb-3"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full p-2 mb-3"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded w-full py-2 hover:bg-blue-600 transition"
        >
          Зарегистрироваться
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};
