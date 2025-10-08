import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import FeedPage from "../pages/FeedPage";

function AppContent() {
  const location = useLocation();

  const hideHeaderPaths = ["/login", "/register"];
  const hideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
