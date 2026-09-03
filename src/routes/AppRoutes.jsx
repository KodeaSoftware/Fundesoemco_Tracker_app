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
import RecursosHumanos from "../pages/RecursosHumanos";

// Protección de rutas
import ProtectedRoute from "../components/ProtectedRoute";

// Animate presence para animaciónes entre paginas
import { AnimatePresence } from "motion/react";

// Routes
const AppRoutes = () => {
  const role = localStorage.getItem("role");

  return (
    <AnimatePresence>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/project-list" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/employee-list" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        {role === "rrhh" && (
          <>
            <Route path="/coordinator-list" element={<ProtectedRoute><Coordinator /></ProtectedRoute>} />
            <Route path="/rrhh-list" element={<ProtectedRoute><RecursosHumanos /></ProtectedRoute>} />
          </>
        )}
        <Route path="/project/:projectName" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
        <Route path="/escaner" element={<ProtectedRoute><Escaner /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
