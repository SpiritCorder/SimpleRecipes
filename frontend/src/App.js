import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// page components
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Navbar from "./components/layout/Navbar";
import AddRecipePage from "./pages/AddRecipe";
import AuthRoute from "./components/utils/AuthRoute";
import PersistAuth from "./components/utils/PersistAuth";

const App = () => {
  return (
    <>
      <PersistAuth>
        <ToastContainer position="top-center" />
        <Navbar />
        <Routes>
          {/* Add New Recipe Page */}
          <Route path="/add-recipe" element={<AuthRoute />}>
            <Route index element={<AddRecipePage />} />
          </Route>
          {/* Register Page */}
          <Route path="/register" element={<RegisterPage />} />
          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </PersistAuth>
    </>
  );
};

export default App;
