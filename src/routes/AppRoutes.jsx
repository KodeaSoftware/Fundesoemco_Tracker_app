import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import CreateProject from "../ui/CreateProject";
import { AnimatePresence } from "motion/react";

const AppRoutes = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/" element={<Dashboard />} />

        <Route path="/project-list" element={<Projects />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
