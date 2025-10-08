import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import { Navigation } from "./Navigation";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import FeedPage from "../pages/FeedPage";
import type { ReactNode } from "react";
import ProfilePage from "../pages/ProfilePage";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children } : LayoutProps) {
  return (
    <div className="app-layout center">
      <Header />
      <div className="app-body g16">
        <Navigation />
        <main className="app-main g16">{children}</main>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  const hideHeaderPaths = ["/login", "/register"];
  const hideLayout = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {hideLayout ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/profile/me" element={<ProfilePage />} />
          </Routes>
        </Layout>
      )}
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
