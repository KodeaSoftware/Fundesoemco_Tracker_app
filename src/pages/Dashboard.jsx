// Layout
import PageLayout from "../layout/PageLayout";

// Componentes
import Header from "../elements/Header";
import PresentesHoyCard from "../elements/PresentesHoyCard";
import AusentesHoyCard from "../elements/AusentesHoyCard";
import HorasPromedioCard from "../elements/HorasPromedioCard";
import AsistenciaMensualCard from "../elements/AsistenciaMensualCard";
import RegistroAsistencia from "../elements/RegistroAsistencia";
import { AsistenciaMensualGrafico } from "../elements/AsistenciaMensualGrafico";
import { AsistenciaInasistenciaGrafico } from "../elements/AsistenciaInasistenciaGrafico";
import { getAttendance } from "../utils/employees";
import { useState, useEffect } from "react";
import { apiClient } from "../utils/apiClient";

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Buenos días";
  } else if (hour >= 12 && hour < 19) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
}

function Dashboard() {
  const [userName, setUserName] = useState(() => localStorage.getItem("nombre") || "");
  const role = localStorage.getItem("role");
  const roleLabel = role === "rrhh" ? "Recursos Humanos" : role === "coordinador" ? "Coordinador" : "Usuario";

  useEffect(() => {
    const savedName = localStorage.getItem("nombre");
    if (savedName) {
      setUserName(savedName);
      return;
    }

    // Si aún no está en localStorage, intentar obtenerlo del backend
    const correo = localStorage.getItem("correo");
    if (correo) {
      apiClient(`/auth/me?correo=${encodeURIComponent(correo)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.nombre) {
            localStorage.setItem("nombre", data.nombre);
            setUserName(data.nombre);
          }
        })
        .catch(() => {});
    }
  }, []);

  const greeting = getGreeting();
  const rawDisplayName = userName || localStorage.getItem("correo")?.split("@")[0] || roleLabel;
  const displayName = rawDisplayName.charAt(0).toUpperCase() + rawDisplayName.slice(1);

  const currentDate = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  return (
    <>
      <Header pageTitle="Dashboard" />
      <PageLayout>
        <motion.div {...pageAnimationsParams}>

          {/* Saludo dinámico al usuario */}
          <div className="px-9 pt-6 pb-4 sm:pt-4 sm:pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                <span>{greeting}, <span className="text-[#00BF40]">{displayName}</span></span>
                <span className="text-xl inline-block hover:scale-110 transition-transform cursor-default">👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Rol: <span className="font-medium text-gray-700">{roleLabel}</span> &bull; Panel de control y asistencia
              </p>
            </div>
            <div className="self-start sm:self-auto text-xs sm:text-sm text-gray-500 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-xs">
              📅 {formattedDate}
            </div>
          </div>

          <div className="px-9 top-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 mb-7">
            <PresentesHoyCard />
            <AusentesHoyCard />
            <HorasPromedioCard />
            <AsistenciaMensualCard />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 p-9 pt-0">
            <AsistenciaMensualGrafico />
            <AsistenciaInasistenciaGrafico />
          </div>

          <div className="w-full h-full flex items-center p-10 pt-0">
            <RegistroAsistencia />
          </div>
        </motion.div>
      </PageLayout>
    </>
  );
}

export default Dashboard;