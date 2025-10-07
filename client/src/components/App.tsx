import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <Router>
      {/* Header виден на всех страницах */}
      <Header />

      {/* Основной контент */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
