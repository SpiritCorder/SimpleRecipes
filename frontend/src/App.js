import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// page components
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Navbar from "./components/layout/Navbar";

const App = () => {
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        {/* Register Page */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
