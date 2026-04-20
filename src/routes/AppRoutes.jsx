// Routing
import { Routes, Route } from "react-router-dom";

// Pages componentes
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Employees from "../pages/Employees";
import Coordinator from "../pages/Coordinator";
import ProjectDetails from "../pages/ProjectDetails";
import Escaner from "../pages/Escaner";

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
        {localStorage.getItem("role") === "rrhh" && (
           <Route path="/coordinator-list" element={<Coordinator />} />
        )}
        <Route path="/project/:projectName" element={<ProjectDetails />} />
        <Route path="/escaner" element={<Escaner />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
