import Header from "../ui/Header";
import PresentesHoyCard from "../ui/PresentesHoyCard";
import AusentesHoyCard from "../ui/AusentesHoyCard";
import HorasPromedioCard from "../ui/HorasPromedioCard";
import AsistenciaMensualCard from "../ui/AsistenciaMensualCard";
import RegistroAsistencia from "../ui/RegistroAsistencia";

function Dashboard() {
  return (
    <div className="bg-gray-50 w-screen min-h-screen overflow-hidden">
      <Header pageTitle="Dashboard" />

      <div className="px-9 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
        <PresentesHoyCard />
        <AusentesHoyCard />
        <HorasPromedioCard />
        <AsistenciaMensualCard />
      </div>
      <div className="w-full h-full flex items-center p-10 pt-0">
        <RegistroAsistencia />
      </div>
    </div>
  );
}

export default Dashboard;
