// Routing
import { Routes, Route } from "react-router-dom";

// Pages componentes
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Employees from "../pages/Employees";

// Animate presence para animaciónes entre paginas
import { AnimatePresence } from "motion/react";

// Routes
const AppRoutes = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/project-list" element={<Projects />} />
        <Route path="/employee-list" element={<Employees />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
