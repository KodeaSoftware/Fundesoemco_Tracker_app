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

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";

function Dashboard() {
  const [debugData, setDebugData] = useState(null);

  useEffect(() => {
    const loadDebugData = async () => {
      try {
        console.log('=== DEBUG: Cargando datos en Dashboard ===');
        const data = await getAttendance();
        console.log('=== DEBUG: Datos completos del endpoint ===');
        console.log(JSON.stringify(data, null, 2));
        setDebugData(data);
      } catch (error) {
        console.error('=== DEBUG: Error al cargar datos ===', error);
      }
    };

    loadDebugData();
  }, []);

  return (
    <>
      <Header pageTitle="Dashboard" />
      <PageLayout>
        <motion.div {...pageAnimationsParams}>


          <div className="px-9 top-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gb-red-200 pt-7 sm:pt-0  mb-7 ">
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