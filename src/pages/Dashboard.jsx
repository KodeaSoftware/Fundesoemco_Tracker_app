// Layout
import PageLayout from "../layout/PageLayout";

// Componentes
import Header from "../elements/Header";
import PresentesHoyCard from "../elements/PresentesHoyCard";
import AusentesHoyCard from "../elements/AusentesHoyCard";
import HorasPromedioCard from "../elements/HorasPromedioCard";
import AsistenciaMensualCard from "../elements/AsistenciaMensualCard";
import RegistroAsistencia from "../elements/RegistroAsistencia";

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";

function Dashboard() {
  return (
    <PageLayout>
      <Header pageTitle="Dashboard" />
      <motion.div {...pageAnimationsParams}>
        <div className="px-9 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
          <PresentesHoyCard />
          <AusentesHoyCard />
          <HorasPromedioCard />
          <AsistenciaMensualCard />
        </div>

        <div className="w-full h-full flex items-center p-10 pt-0">
          <RegistroAsistencia />
        </div>
      </motion.div>
    </PageLayout>
  );
}

export default Dashboard;
