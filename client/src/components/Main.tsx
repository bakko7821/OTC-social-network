import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import type { JSX } from "react";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

export default function Main() : JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    )
}