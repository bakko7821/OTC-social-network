import { useState, type JSX } from "react";
import axios, { AxiosError } from "axios";

interface ApiError {
  message?: string;
}

export default function LoginPage() : JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
      window.location.href = "/"
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      setMessage(error.response?.data?.message || "Ошибка при авторизации");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Авторизация</h2>

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
          Войти
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};
