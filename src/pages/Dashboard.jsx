import Header from "../ui/Header";
import PresentesHoyCard from "../ui/dashboard/PresentesHoyCard";
import AusentesHoyCard from "../ui/dashboard/AusentesHoyCard";
import HorasPromedioCard from "../ui/dashboard/HorasPromedioCard";
import AsistenciaMensualCard from "../ui/dashboard/AsistenciaMensualCard";
import RegistroAsistencia from "../ui/dashboard/RegistroAsistencia";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import PageLayout from "../layout/PageLayout";

function Dashboard() {
  return (
    <PageLayout>
      <Header pageTitle="Dashboard" />
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
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
