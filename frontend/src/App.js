import { Routes, Route } from "react-router-dom";

// page components
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const App = () => {
  return (
    <>
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
